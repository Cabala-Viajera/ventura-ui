'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { Post } from '@/app/_models/Post'
import { postPath, staticPath } from '@/i18n/content-paths'

type ArticleState = { path: string; article: Post; slug: string } | null
const ArticleContext = createContext<{
  article: ArticleState
  setArticle: (article: ArticleState) => void
}>({ article: null, setArticle: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [article, setArticle] = useState<ArticleState>(null)
  return (
    <ArticleContext.Provider value={{ article, setArticle }}>
      {children}
    </ArticleContext.Provider>
  )
}

/** Supply published translation links to the header without fetching CMS data in the browser. */
export function ArticleLanguages({
  article,
  slug,
}: {
  article: Post
  slug: string
}) {
  const path = usePathname()
  const { setArticle } = useContext(ArticleContext)
  useEffect(() => {
    setArticle({ path, article, slug })
    return () => setArticle(null)
  }, [path, article, slug, setArticle])
  return null
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations()
  const pathname = usePathname()
  const search = useSearchParams()
  const { article } = useContext(ArticleContext)
  const target = locale === 'es' ? 'en' : 'es'
  const staticPage = (['home', 'articles', 'privacy'] as const).find(
    page => staticPath(locale, page) === pathname
  )
  let href: string | undefined
  if (staticPage) {
    href = staticPath(target, staticPage)
    const q = search.get('q')
    if (staticPage === 'articles' && q) href += `?${new URLSearchParams({ q })}`
  } else if (article?.path === pathname) {
    const translation = article.article.translations?.find(
      item => item?.language === target && item.slug?.current
    )
    if (translation?.slug?.current)
      href = postPath(target, translation.slug.current)
  }
  return (
    <nav
      aria-label={t('switchLanguage')}
      className='ml-3 flex shrink-0 flex-col items-end gap-2 text-sm'
    >
      <div className='flex gap-3'>
        {(['es', 'en'] as const).map(language =>
          language === locale ? (
            <span
              key={language}
              lang={language}
              aria-current='true'
              className='font-bold underline underline-offset-4'
            >
              {language === 'es' ? 'Español' : 'English'}
            </span>
          ) : href ? (
            <Link
              key={language}
              href={href}
              hrefLang={language}
              lang={language}
              className='min-h-11 inline-flex items-center rounded-sm focus-visible:outline-2'
            >
              {language === 'es' ? 'Español' : 'English'}
            </Link>
          ) : (
            <span
              key={language}
              lang={language}
              aria-disabled='true'
              className='text-gray-500'
            >
              {language === 'es' ? 'Español' : 'English'}
            </span>
          )
        )}
      </div>
      {!staticPage && !href && (
        <details className='max-w-44 text-right font-normal'>
          <summary className='cursor-pointer'>
            {t('translationUnavailable')}
          </summary>
          <p>{t('missingTranslation')}</p>
          <Link href={staticPath(target)} className='underline'>
            {t('otherHome')}
          </Link>
        </details>
      )}
    </nav>
  )
}
