export const postPath = (locale: string, slug: string) =>
  `${locale === 'en' ? '/en' : ''}/${encodeURIComponent(slug)}`
export const staticPath = (
  locale: string,
  page: 'home' | 'articles' | 'privacy' = 'home'
) => {
  const paths = {
    es: { home: '/', articles: '/articulos', privacy: '/privacidad' },
    en: { home: '/en', articles: '/en/articles', privacy: '/en/privacy' },
  }
  return paths[locale === 'en' ? 'en' : 'es'][page]
}
