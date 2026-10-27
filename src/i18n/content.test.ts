import { describe, expect, it, vi } from 'vitest'
import {
  getPost,
  languageFilter,
  postAlternates,
  staticAlternates,
} from './content'
import { staticPath, postPath } from './content-paths'
import { SITE_URL } from '@/app/_utils/constants'
import es from './messages/es.json'
import en from './messages/en.json'
import { routing } from './routing'

const { fetch } = vi.hoisted(() => ({ fetch: vi.fn() }))
vi.mock('@utils/sanityClient', () => ({ sanityClient: { fetch } }))

describe('localized content', () => {
  it('keeps Spanish URLs and translates English static paths', () => {
    expect(staticPath('es')).toBe('/')
    expect(staticPath('en')).toBe('/en')
    expect(staticPath('es', 'articles')).toBe('/articulos')
    expect(staticPath('en', 'articles')).toBe('/en/articles')
    expect(staticPath('en', 'privacy')).toBe('/en/privacy')
    expect(postPath('es', 'mexico')).toBe('/mexico')
    expect(postPath('en', 'mexico-guide')).toBe('/en/mexico-guide')
    expect(routing.localeDetection).toBe(false)
    expect(routing.alternateLinks).toBe(false)
  })
  it('provides every message in both languages', () => {
    expect(Object.keys(en).sort()).toEqual(Object.keys(es).sort())
  })
  it('queries articles by both slug and language using only published content', async () => {
    fetch.mockResolvedValue(null)
    await getPost('en', 'guide')
    expect(fetch).toHaveBeenLastCalledWith(
      expect.stringContaining(languageFilter),
      { locale: 'en', slug: 'guide' },
      expect.objectContaining({ perspective: 'published' })
    )
    expect(fetch.mock.lastCall![0]).toContain('slug.current == $slug')
  })
  it('uses translated slugs and omits missing translations from alternates', () => {
    const post = {
      _id: 'es-post',
      title: 'México',
      description: 'Guía',
      translations: [
        null,
        {
          _id: 'en-post',
          language: 'en' as const,
          slug: { current: 'mexico-guide' },
        },
      ],
    }
    expect(postAlternates(post, 'es', 'mexico')).toEqual({
      canonical: SITE_URL + '/mexico',
      languages: {
        es: SITE_URL + '/mexico',
        en: SITE_URL + '/en/mexico-guide',
        'x-default': SITE_URL + '/mexico',
      },
    })
    expect(
      postAlternates({ ...post, translations: [] }, 'es', 'mexico').languages
    ).not.toHaveProperty('en')
    expect(staticAlternates('articles').languages.en).toBe(
      SITE_URL + '/en/articles'
    )
  })
})
