import { sanityClient } from '@utils/sanityClient'
import { Post } from '../_models/Post'
import { Error, Hero } from '@components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import { PortableTextImage } from '../_components/Sanity/SanityComponents'

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  let post: Post | null = null
  let isError = false
  const { slug } = await params
  const getPostBySlugQuery =
    '*[_type == "post" && slug.current == $slug][0]{ _id, title, slug{current}, description, country ,imgUrl{ asset->{ url } }, thumbnailImgUrl{ asset->{ url } }, content }'
  try {
    post = await sanityClient.fetch<Post | null>(getPostBySlugQuery, { slug })
  } catch {
    isError = true
  }
  if (isError || !post || !post._id) {
    return <Error />
  }

  const ptComponents = {
    types: {
      image: PortableTextImage,
    },
  }

  return (
    <>
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
