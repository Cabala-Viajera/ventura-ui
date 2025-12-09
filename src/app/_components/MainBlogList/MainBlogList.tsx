import { Card } from '@components'
import { sanityClient } from '@/app/_utils/sanity'
import Image from 'next/image'
import { Titan_One } from 'next/font/google'

const POSTS_QUERY = `*[ _type == "post"]`

interface Post {
  _id: string
  title: string
}

const titan_one = Titan_One({
  weight: ['400'],
  subsets: ['latin'],
})

const MainBlogList = async (): Promise<React.ReactNode> => {
  const posts: Post[] = await sanityClient.fetch(POSTS_QUERY)
  return (
    <div className='m-10'>
      {posts.length > 0 ? (
        posts.map((post: Post) => <Card key={post._id} title={post.title} />)
      ) : (
        <div className='flex flex-col items-center justify-center w-[100%] gap-6'>
          <Image
            src='/assets/not-found.png'
            alt='No posts'
            width={400}
            height={400}
          />
          <p
            className={`text-gray-950 text-4xl font-bold ${titan_one.className}`}
          >
            Ningún post reciente
          </p>
        </div>
      )}
    </div>
  )
}

export default MainBlogList
