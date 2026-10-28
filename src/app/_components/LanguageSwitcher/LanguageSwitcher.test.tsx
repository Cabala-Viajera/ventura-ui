import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextIntlClientProvider } from 'next-intl'
import { LanguageSwitcher } from './LanguageSwitcher'
import en from '@/i18n/messages/en.json'
import es from '@/i18n/messages/es.json'
import type { Locale } from '@/i18n/routing'

const state = vi.hoisted(() => ({ pathname: '/', search: '', push: vi.fn() }))
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: state.push }),
  usePathname: () => state.pathname,
  useSearchParams: () => new URLSearchParams(state.search),
}))

function switcher(locale: Locale = 'es') {
  return render(
    <NextIntlClientProvider
      locale={locale}
      messages={locale === 'en' ? en : es}
    >
      <LanguageSwitcher />
    </NextIntlClientProvider>
  )
}

beforeEach(() => {
  state.pathname = '/'
  state.search = ''
  state.push.mockClear()
})

describe('language switcher', () => {
  it.each([
    ['es', '/', 'en', '/en'],
    ['es', '/articulos', 'en', '/en'],
    ['es', '/mexico', 'en', '/en'],
    ['es', '/privacidad', 'en', '/en'],
    ['en', '/en', 'es', '/'],
    ['en', '/en/articles', 'es', '/'],
    ['en', '/en/mexico-guide', 'es', '/'],
    ['en', '/en/privacy', 'es', '/'],
  ] as const)(
    'switches from %s at %s to the %s homepage',
    (locale, pathname, target, home) => {
      state.pathname = pathname
      state.search = 'q=Mexico&page=3'
      switcher(locale)
      const trigger = screen.getByRole('button')
      expect(trigger.textContent).toBe(locale.toUpperCase())
      fireEvent.click(trigger)
      const option = screen.getByRole('button', { name: target.toUpperCase() })
      expect((option as HTMLButtonElement).disabled).toBe(false)
      fireEvent.click(option)
      expect(state.push).toHaveBeenCalledExactlyOnceWith(home)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      expect(document.activeElement).toBe(trigger)
    }
  )

  it('closes without navigating when selecting the current language', () => {
    state.pathname = '/mexico'
    switcher()
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    fireEvent.click(screen.getByRole('button', { name: 'ES' }))
    expect(state.push).not.toHaveBeenCalled()
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes with Escape or an outside click', () => {
    switcher()
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    fireEvent.keyDown(screen.getByRole('button', { name: 'EN' }), {
      key: 'Escape',
    })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger)
    fireEvent.click(trigger)
    fireEvent.pointerDown(document.body)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes when keyboard focus leaves the dropdown', () => {
    switcher()
    const trigger = screen.getByRole('button')
    fireEvent.click(trigger)
    fireEvent.blur(trigger, { relatedTarget: document.body })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})
