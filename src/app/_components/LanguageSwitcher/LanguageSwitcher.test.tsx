import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import {
  ArticleLanguages,
  LanguageProvider,
  LanguageSwitcher,
} from './LanguageSwitcher'
import en from '@/i18n/messages/en.json'

const state = vi.hoisted(() => ({ pathname: '/', search: '' }))
vi.mock('next/navigation', () => ({
  usePathname: () => state.pathname,
  useSearchParams: () => new URLSearchParams(state.search),
}))

function switcher(english = false, translation = true) {
  const ui = (
    <LanguageProvider>
      <LanguageSwitcher />
      {state.pathname.includes('mexico') && (
        <ArticleLanguages
          slug='mexico'
          article={{
            _id: 'es-post',
            title: 'México',
            description: 'Guía',
            translations: translation
              ? [
                  {
                    _id: 'en-post',
                    language: 'en',
                    slug: { current: 'mexico-guide' },
                  },
                ]
              : [],
          }}
        />
      )}
    </LanguageProvider>
  )
  return render(
    english ? (
      <NextIntlClientProvider locale='en' messages={en}>
        {ui}
      </NextIntlClientProvider>
    ) : (
      ui
    )
  )
}

describe('language switcher', () => {
  it('links from the Spanish homepage to English', () => {
    state.pathname = '/'
    state.search = ''
    switcher()
    expect(
      screen.getByRole('link', { name: 'English' }).getAttribute('href')
    ).toBe('/en')
  })
  it('preserves a search but resets page when switching lists', () => {
    state.pathname = '/en/articles'
    state.search = 'q=Mexico&page=3'
    switcher(true)
    expect(
      screen.getByRole('link', { name: 'Español' }).getAttribute('href')
    ).toBe('/articulos?q=Mexico')
  })
  it('uses a published counterpart slug rather than copying the Spanish slug', () => {
    state.pathname = '/mexico'
    state.search = ''
    switcher()
    expect(
      screen.getByRole('link', { name: 'English' }).getAttribute('href')
    ).toBe('/en/mexico-guide')
  })
  it('shows a notice and homepage link when the translation is missing', () => {
    state.pathname = '/mexico'
    state.search = ''
    switcher(false, false)
    expect(screen.queryByRole('link', { name: 'English' })).toBeNull()
    expect(screen.getByText('Traducción no disponible')).toBeDefined()
    expect(
      screen.getByText('Ir al inicio en inglés').getAttribute('href')
    ).toBe('/en')
  })
})
