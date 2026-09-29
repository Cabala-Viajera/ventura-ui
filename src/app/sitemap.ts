import type { MetadataRoute } from 'next'
import { sanityClient } from '@utils/sanityClient'
import { SITE_URL } from './_utils/constants'

const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs: string[] = []

  try {
    slugs = await sanityClient.fetch<string[]>(SLUGS_QUERY)
  } catch {
    slugs = []
  }

  const postEntries: MetadataRoute.Sitemap = slugs.map(slug => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/articulos`,
      lastModified: new Date(),
    },
    ...postEntries,
  ]
}
