import { getLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { getPost, postPath, postAlternates, staticPath } from '@/i18n/content'
import { ArticleLanguages } from '@/app/_components/LanguageSwitcher/LanguageSwitcher'
import type { Metadata } from 'next'
import { Error, Hero, ShareButtons } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { PortableTextComponents } from '@portabletext/react'
import { PortableTextImage } from '../../_components/Sanity/SanityComponents'
import { SITE_URL } from '../../_utils/constants'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const locale = await getLocale()
  const t = await getTranslations()
  let post
  try {
    post = await getPost(locale, slug)
  } catch {
    return { title: t('error') }
  }

  if (!post) {
    return { title: t('postMissing'), robots: { index: false } }
  }

  const image = post.imgUrl?.asset?.url || post.thumbnailImgUrl?.asset?.url

  return {
    title: post.title,
    description: post.description,
    alternates: postAlternates(post, locale, slug),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}${postPath(locale, slug)}`,
      type: 'article',
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: image ? [image] : undefined,
    },
  }
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const locale = await getLocale()
  const t = await getTranslations()
  let post
  try {
    post = await getPost(locale, slug)
  } catch {
    return <Error />
  }

  if (!post || !post._id) notFound()

  const ptComponents: Partial<PortableTextComponents> = {
    types: {
      image: PortableTextImage,
    },
    block: {
      normal: ({ children }) => <p className='mb-5'>{children}</p>,
      h1: ({ children }) => (
        <h1 className='mt-8 mb-4 text-3xl font-bold'>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className='mt-8 mb-4 text-2xl font-bold'>{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className='mt-6 mb-3 text-xl font-bold'>{children}</h3>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className='mb-5 list-disc pl-6'>{children}</ul>
      ),
      number: ({ children }) => (
        <ol className='mb-5 list-decimal pl-6'>{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className='my-2'>{children}</li>,
      number: ({ children }) => <li className='my-2'>{children}</li>,
    },
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: locale,
    headline: post.title,
    description: post.description,
    image: post.imgUrl?.asset?.url || post.thumbnailImgUrl?.asset?.url,
    mainEntityOfPage: `${SITE_URL}${postPath(locale, slug)}`,
  }

  return (
    <>
      <script
        type='application/ld+json'
        // Escape '<' so CMS content cannot terminate the HTML script element.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ArticleLanguages article={post} slug={slug} />
      <Hero
        title={post.country || ''}
        imgHeight={550}
        imgUrl={post.thumbnailImgUrl?.asset?.url || ''}
      />
      <section className='mx-auto lg:mx-[15%] grid lg:grid-cols-[max-content_minmax(0,1fr)] min-h-[50vh] w-full lg:w-[70%] px-4 sm:px-6 lg:px-0 my-6 lg:my-10 gap-6 lg:gap-10'>
        <div className='min-w-0 font-bold text-primary flex items-start'>
          <Link href={staticPath(locale)} className='flex items-center gap-2'>
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className='text-xl lg:text-3xl'
              aria-hidden='true'
            />
            <span className='text-xl lg:text-3xl'>{t('home')}</span>
          </Link>
        </div>
        <article className='w-full min-w-0 [overflow-wrap:anywhere]'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
            {post.title}
          </h1>
          <ShareButtons
            title={post.title}
            url={`${SITE_URL}${postPath(locale, slug)}`}
          />
          <section className='py-6 lg:py-8 text-base sm:text-lg leading-relaxed'>
            <div className='mb-6 lg:mb-10'>{post.description}</div>
            <section className='text-left md:text-justify'>
              {Array.isArray(post.content) ? (
                <PortableText value={post.content} components={ptComponents} />
              ) : (
                <div>{t('unavailable')}</div>
              )}
            </section>
          </section>
        </article>
      </section>
    </>
  )
}

export default PostPage
