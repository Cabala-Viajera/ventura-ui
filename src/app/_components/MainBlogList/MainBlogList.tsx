import { Card, Error } from '@components'
import { sanityClient } from '@/app/_utils/sanity'
import Image from 'next/image'
import { JSX } from 'react'

const POSTS_QUERY = `*[_type == "post"]{ _id, title }`

interface Post {
  _id: string
  title: string
}

export default async function MainBlogList(): Promise<JSX.Element> {
  let posts: Post[] = []
  let isError = false

  try {
    const result = await sanityClient.fetch<Post[]>(POSTS_QUERY)
    posts = Array.isArray(result) ? result : []
  } catch {
    isError = true
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='m-10 flex flex-wrap gap-6 justify-center lg:justify-start '>
      {posts.length > 0 ? (
        posts.map(post => <Card key={post._id} title={post.title} />)
      ) : (
        <div className='flex flex-col items-center justify-center w-[100%] gap-6'>
          <Image
            src='/assets/not-found.png'
            alt='No posts'
            width={400}
            height={400}
          />
          <p className={`text-gray-950 text-4xl font-bold -ml-24`}>
            Nada por aquí
          </p>
        </div>
      )}
    </div>
  )
}
