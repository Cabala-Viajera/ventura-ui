import { Card, Error } from '@components'
import { sanityClient } from '@utils/sanityClient'
import Image from 'next/image'
import { JSX } from 'react'
import Link from 'next/link'
import { Post } from '@/app/_models/Post'

const POSTS_QUERY = `*[_type == "post"] | order(_createdAt desc) [0...6]{ _id, title, slug{current}, description, imgUrl{ asset->{ url } } }`

export default async function MainBlogList(): Promise<JSX.Element> {
  let posts: Post[] = []
  let isError = false

  try {
    const result = await sanityClient.fetch<Post[]>(
      POSTS_QUERY,
      {},
      { next: { revalidate: 60 } }
    )
    posts = Array.isArray(result) ? result : []
  } catch {
    isError = true
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='w-full min-w-0'>
      <h2 className='my-10 text-3xl sm:text-4xl font-bold text-center lg:text-start'>
        Últimas publicaciones
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center'>
        {posts.length > 0 ? (
          posts.map(post =>
            post.slug?.current ? (
              <Link
                key={post._id}
                href={`/${post.slug?.current}`}
                className='w-full max-w-[350px] min-w-0'
              >
                <Card
                  title={post.title}
                  description={post.description}
                  imgUrl={post.imgUrl?.asset?.url}
                />
              </Link>
            ) : (
              <Card
                key={post._id}
                title={post.title}
                description={post.description}
                imgUrl={post.imgUrl?.asset?.url}
              />
            )
          )
        ) : (
          <div className='col-span-full flex flex-col items-center justify-center w-full gap-6'>
            <Image
              src='/assets/not-found.png'
              alt='No posts'
              width={400}
              height={400}
              className='w-full max-w-[400px] h-auto'
            />
            <p className='text-gray-950 text-3xl sm:text-4xl font-bold text-center'>
              Nada por aquí
            </p>
          </div>
        )}
      </div>
      <div className='mt-5 text-center w-full'>
        <Link
          href='/articulos'
          className='mt-4  text-primary font-bold  cursor-pointer underline text-xl hover:opacity-80 transition-opacity'
          aria-label='Ver todos los artículos'
        >
          Ver más
        </Link>
      </div>
    </div>
  )
}
