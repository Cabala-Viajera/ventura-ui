import type { Metadata } from 'next'
import { sanityClient } from '@utils/sanityClient'
import { Post } from '../_models/Post'
import { Error, Hero } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
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

  const ptComponents = {
    types: {
      image: PortableTextImage,
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
      <section className='flex min-h-[50vh] w-full px-4 my-10 gap-4'>
        <div className='w-1/5 text-right font-bold text-primary px-5 flex items-start justify-end gap-2 cursor-pointer'>
          <Link href='/' className='flex items-center gap-2'>
            <FontAwesomeIcon
              icon={faArrowLeftLong}
              className='text-3xl'
              aria-hidden='true'
            />
            <span className='text-3xl'>Inicio</span>
          </Link>
        </div>
        <div className='w-4/5'>
          <h1 className='text-5xl font-bold px-5'>{post.title}</h1>
          <section className='px-5 py-8 text-lg'>
            <div className='mb-10'>{post.description}</div>
            <section className='text-justify pr-[20%]'>
              {Array.isArray(post.content) ? (
                <PortableText value={post.content} components={ptComponents} />
              ) : (
                <div>No Disponible</div>
              )}
            </section>
          </section>
        </div>
      </section>
    </>
  )
}

export default PostPage
