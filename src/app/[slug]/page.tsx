import type { Metadata } from 'next'
import { sanityClient } from '@utils/sanityClient'
import { Post } from '../_models/Post'
import { Error, Hero } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { PortableTextComponents } from '@portabletext/react'
import { PortableTextImage } from '../_components/Sanity/SanityComponents'
import { SITE_URL } from '../_utils/constants'

const getPostBySlugQuery =
  '*[_type == "post" && slug.current == $slug][0]{ _id, title, slug{current}, description, country ,imgUrl{ asset->{ url } }, thumbnailImgUrl{ asset->{ url } }, content }'

const getPost = async (slug: string) => {
  try {
    return await sanityClient.fetch<Post | null>(getPostBySlugQuery, { slug })
  } catch {
    return null
  }
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return { title: 'Publicación no encontrada' }
  }

  const image = post.imgUrl?.asset?.url || post.thumbnailImgUrl?.asset?.url

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/${slug}`,
      type: 'article',
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
  const post = await getPost(slug)

  if (!post || !post._id) {
    return <Error />
  }

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
    headline: post.title,
    description: post.description,
    image: post.imgUrl?.asset?.url || post.thumbnailImgUrl?.asset?.url,
    mainEntityOfPage: `${SITE_URL}/${slug}`,
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        title={post.country || ''}
        imgHeight={350}
        imgUrl={post.thumbnailImgUrl?.asset?.url || ''}
      />
      <section className='mx-auto lg:mx-[15%] grid lg:grid-cols-[max-content_minmax(0,1fr)] min-h-[50vh] w-full lg:w-[70%] px-4 sm:px-6 lg:px-0 my-6 lg:my-10 gap-6 lg:gap-10'>
        <div className='min-w-0 font-bold text-primary flex items-start'>
          <Link href='/' className='flex items-center gap-2'>
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className='text-xl lg:text-3xl'
              aria-hidden='true'
            />
            <span className='text-xl lg:text-3xl'>Inicio</span>
          </Link>
        </div>
        <article className='w-full min-w-0 [overflow-wrap:anywhere]'>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight'>
            {post.title}
          </h1>
          <section className='py-6 lg:py-8 text-base sm:text-lg leading-relaxed'>
            <div className='mb-6 lg:mb-10'>{post.description}</div>
            <section className='text-left md:text-justify'>
              {Array.isArray(post.content) ? (
                <PortableText value={post.content} components={ptComponents} />
              ) : (
                <div>No Disponible</div>
              )}
            </section>
          </section>
        </article>
      </section>
    </>
  )
}

export default PostPage
