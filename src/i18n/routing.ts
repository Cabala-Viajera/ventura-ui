import { defineRouting } from 'next-intl/routing'
export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/articulos': { es: '/articulos', en: '/articles' },
    '/privacidad': { es: '/privacidad', en: '/privacy' },
    '/[slug]': '/[slug]',
  },
})
export type Locale = (typeof routing.locales)[number]
export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en'
}
