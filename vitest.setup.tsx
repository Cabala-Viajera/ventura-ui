import React from 'react'
import { NextIntlClientProvider, createTranslator } from 'next-intl'
import messages from './src/i18n/messages/es.json'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
afterEach(cleanup)

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}))

vi.mock('next/font/google', () => ({
  Dongle: () => ({ className: '', variable: '', style: {} }),
}))

vi.mock('next-intl/server', () => ({
  getLocale: vi.fn(async () => 'es'),
  getTranslations: vi.fn(async () =>
    createTranslator({ locale: 'es', messages })
  ),
  setRequestLocale: vi.fn(),
}))
vi.mock('@testing-library/react', async importOriginal => {
  const original =
    await importOriginal<typeof import('@testing-library/react')>()
  return {
    ...original,
    render: (
      ui: React.ReactNode,
      options: Parameters<typeof original.render>[1] = {}
    ) =>
      original.render(ui, {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <NextIntlClientProvider locale='es' messages={messages}>
            {children}
          </NextIntlClientProvider>
        ),
        ...options,
      }),
  }
})
