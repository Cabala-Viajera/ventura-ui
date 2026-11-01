import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTranslator, NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import MainBlogList from './_components/MainBlogList/MainBlogList'
import ArticlesPage from './[locale]/articulos/page'
import sitemap from './sitemap'
import type { Locale } from '@/i18n/routing'
import en from '@/i18n/messages/en.json'
import es from '@/i18n/messages/es.json'
import { SITE_URL } from './_utils/constants'

const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }))
vi.mock('@utils/sanityClient', () => ({ sanityClient: { fetch } }))
vi.mock('@components', () => ({
  Card: ({ title }: { title: string }) => <h2>{title}</h2>,
  Error: () => <p>Error</p>,
  Pagination: () => null,
  SearchBar: () => null,
}))

beforeEach(() => fetch.mockReset())

function setLocale(locale: Locale) {
  const messages = locale === 'en' ? en : es
  vi.mocked(getLocale).mockResolvedValue(locale)
  vi.mocked(getTranslations).mockResolvedValue(
    createTranslator({ locale, messages })
  )
  return messages
}

describe.each(['es', 'en'] as const)('%s published posts', locale => {
  it.each(['home', 'list', 'search'] as const)(
    'filters %s by explicit language without requiring a translation',
    async page => {
      const messages = setLocale(locale)
      const post = {
        _id: 'independent-post',
        title: 'Independent article',
        description: 'Published without a counterpart',
        language: locale,
        slug: { current: 'independent' },
      }
      fetch.mockResolvedValue(
        page === 'home' ? [post] : { posts: [post], total: 1 }
      )
      const ui =
        page === 'home'
          ? await MainBlogList()
          : await ArticlesPage({
              searchParams: Promise.resolve(
                page === 'search' ? { q: 'travel' } : {}
              ),
            })
      render(
        <NextIntlClientProvider locale={locale} messages={messages}>
          {ui}
        </NextIntlClientProvider>
      )
      expect(
        screen.getByRole('link', { name: post.title }).getAttribute('href')
      ).toBe(`${locale === 'en' ? '/en' : ''}/independent`)
      const [query, params, options] = fetch.mock.lastCall!
      expect(params.locale).toBe(locale)
      expect(options.perspective).toBe('published')
      expect(query).not.toMatch(/coalesce|translation\.metadata/)
      expect(query.match(/language == \$locale/g)).toHaveLength(
        page === 'home' ? 1 : 2
      )
      if (page === 'search') expect(params.terms).toEqual(['travel*'])
    }
  )

  it.each(['home', 'list'] as const)(
    'shows the localized empty state on %s',
    async page => {
      const messages = setLocale(locale)
      fetch.mockResolvedValue(page === 'home' ? [] : { posts: [], total: 0 })
      const ui =
        page === 'home'
          ? await MainBlogList()
          : await ArticlesPage({ searchParams: Promise.resolve({}) })
      render(
        <NextIntlClientProvider locale={locale} messages={messages}>
          {ui}
        </NextIntlClientProvider>
      )
      expect(screen.getByText(messages.empty)).toBeDefined()
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch.mock.lastCall![1].locale).toBe(locale)
    }
  )
})

it('sitemap queries only published posts with an explicit supported language', async () => {
  fetch.mockResolvedValue([
    {
      _id: 'es-only',
      language: 'es',
      slug: { current: 'viaje' },
      _updatedAt: '2026-10-27',
    },
    {
      _id: 'en-only',
      language: 'en',
      slug: { current: 'trip' },
      _updatedAt: '2026-10-27',
    },
  ])
  const entries = await sitemap()
  const [query, , options] = fetch.mock.lastCall!
  expect(query).toContain('language in ["es", "en"]')
  expect(query).not.toContain('coalesce')
  expect(options.perspective).toBe('published')
  expect(entries.map(entry => entry.url)).toEqual([
    `${SITE_URL}/`,
    `${SITE_URL}/en`,
    `${SITE_URL}/articulos`,
    `${SITE_URL}/en/articles`,
    `${SITE_URL}/viaje`,
    `${SITE_URL}/en/trip`,
  ])
  expect(entries[4].alternates?.languages).not.toHaveProperty('en')
  expect(entries[5].alternates?.languages).not.toHaveProperty('es')
})
