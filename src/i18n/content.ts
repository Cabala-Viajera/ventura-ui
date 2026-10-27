import { cache } from 'react'
import { sanityClient } from '@utils/sanityClient'
import type { Post } from '@/app/_models/Post'
import type { Locale } from './routing'
import { SITE_URL } from '@/app/_utils/constants'

export const languageFilter = 'coalesce(language, "es") == $locale'
import { postPath, staticPath } from './content-paths'
export { postPath, staticPath } from './content-paths'
export const translationsProjection = `"translations": *[_type == "translation.metadata" && references(^._id)][0].translations[].value->{ _id, language, slug{current} }`
export const getPost = cache(async (locale: Locale, slug: string) =>
  sanityClient.fetch<Post | null>(
    `*[_type == "post" && ${languageFilter} && slug.current == $slug][0]{ _id, title, language, slug{current}, description, country, imgUrl{ asset->{ url } }, thumbnailImgUrl{ asset->{ url } }, content, ${translationsProjection} }`,
    { locale, slug },
    { perspective: 'published', next: { revalidate: 60 } }
  )
)
export function postAlternates(post: Post, locale: Locale, slug: string) {
  const languages: Record<string, string> = {
    [locale]: SITE_URL + postPath(locale, slug),
  }
  for (const translation of post.translations ?? []) {
    if (
      translation &&
      translation.slug?.current &&
      (translation.language === 'es' || translation.language === 'en')
    )
      languages[translation.language] =
        SITE_URL + postPath(translation.language, translation.slug.current)
  }
  if (languages.es) languages['x-default'] = languages.es
  return { canonical: SITE_URL + postPath(locale, slug), languages }
}
export function staticAlternates(page: 'home' | 'articles' | 'privacy') {
  return {
    languages: {
      es: SITE_URL + staticPath('es', page),
      en: SITE_URL + staticPath('en', page),
      'x-default': SITE_URL + staticPath('es', page),
    },
  }
}
