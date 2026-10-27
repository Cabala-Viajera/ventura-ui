import type { MetadataRoute } from 'next'
import { sanityClient } from '@utils/sanityClient'
import { SITE_URL } from './_utils/constants'
import { postAlternates, translationsProjection } from '@/i18n/content'
import { postPath, staticPath } from '@/i18n/content-paths'
import type { Post } from './_models/Post'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await sanityClient.fetch<(Post & { _updatedAt: string })[]>(
    `*[_type == "post" && defined(slug.current) && coalesce(language, "es") in ["es", "en"]]{ _id, language, slug{current}, _updatedAt, ${translationsProjection} }`,
    {},
    { perspective: 'published', next: { revalidate: 60 } }
  )
  const staticEntries: MetadataRoute.Sitemap = (
    ['home', 'articles'] as const
  ).flatMap(page =>
    (['es', 'en'] as const).map(locale => ({
      url: SITE_URL + staticPath(locale, page),
      alternates: {
        languages: {
          es: SITE_URL + staticPath('es', page),
          en: SITE_URL + staticPath('en', page),
          'x-default': SITE_URL + staticPath('es', page),
        },
      },
    }))
  )
  return [
    ...staticEntries,
    ...posts.map(post => {
      const locale = post.language ?? 'es'
      const slug = post.slug!.current
      return {
        url: SITE_URL + postPath(locale, slug),
        lastModified: post._updatedAt,
        alternates: { languages: postAlternates(post, locale, slug).languages },
      }
    }),
  ]
}
