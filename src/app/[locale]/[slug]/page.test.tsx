import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { Post } from '../../_models/Post'
import { SITE_URL } from '../../_utils/constants'
import PostPage from './page'

const { fetchPost } = vi.hoisted(() => ({ fetchPost: vi.fn() }))

vi.mock('@utils/sanityClient', () => ({
  sanityClient: { fetch: fetchPost },
}))

vi.mock('@components', () => ({
  Error: () => null,
  Hero: () => null,
  ShareButtons: () => null,
}))

vi.mock('@/app/_components/LanguageSwitcher/LanguageSwitcher', () => ({
  ArticleLanguages: () => null,
}))

vi.mock('next-sanity', () => ({ PortableText: () => null }))
vi.mock('../_components/Sanity/SanityComponents', () => ({
  PortableTextImage: () => null,
}))

const post: Post = {
  _id: 'post-id',
  title: 'Guía de México: "rutas" & aventuras',
  description: 'Consejos para viajar: montaña, café & mar.',
  imgUrl: { asset: { url: 'https://cdn.sanity.io/image.jpg?a=1&b=2' } },
}

async function renderPost(overrides: Partial<Post> = {}) {
  const article = { ...post, ...overrides }
  fetchPost.mockResolvedValue(article)
  const page = await PostPage({
    params: Promise.resolve({ slug: 'test-post' }),
  })
  const html = renderToStaticMarkup(page)
  // Parse server HTML so HTML script termination is exercised, unlike innerHTML
  // assertions on a client-rendered React tree.
  const document = new DOMParser().parseFromString(html, 'text/html')
  return { article, document }
}

describe('article JSON-LD', () => {
  it.each(['title', 'description'] as const)(
    'contains injection payloads in %s without creating executable markup',
    async field => {
      const payload =
        '</script><script data-injected>window.injected = true</script><img data-injected src=x onerror="window.injected = true">'
      const { article, document } = await renderPost({ [field]: payload })

      expect(document.querySelectorAll('script')).toHaveLength(1)
      expect(document.querySelector('[data-injected]')).toBeNull()
      const script = document.querySelector(
        'script[type="application/ld+json"]'
      )
      expect(script).not.toBeNull()
      expect(JSON.parse(script!.textContent!)).toMatchObject({
        headline: article.title,
        description: article.description,
      })
    }
  )

  it('contains mixed-case script closing tags', async () => {
    const title = '</ScRiPt><script data-injected>alert(1)</script>'
    const { document } = await renderPost({ title })

    expect(document.querySelectorAll('script')).toHaveLength(1)
    expect(document.querySelector('[data-injected]')).toBeNull()
    const script = document.querySelector('script[type="application/ld+json"]')
    expect(JSON.parse(script!.textContent!).headline).toBe(title)
  })

  it('preserves ordinary text and structured data', async () => {
    const { document } = await renderPost()
    const script = document.querySelector('script[type="application/ld+json"]')

    expect(JSON.parse(script!.textContent!)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      inLanguage: 'es',
      headline: post.title,
      description: post.description,
      image: post.imgUrl?.asset?.url,
      mainEntityOfPage: `${SITE_URL}/test-post`,
    })
  })
})
