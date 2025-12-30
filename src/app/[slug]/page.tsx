import { Hero } from '../_components'
import { sanityClient } from '@/app/_utils/sanity'
import { Post } from '../_models/Post'
import { Error } from '@components'

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  let post: Post = {
    _id: '',
    title: '',
    slug: { current: '' },
    description: '',
  }
  let isError = false
  const { slug } = await params
  const GET_POST_BY_SLUG = `*[_type == "post" && slug.current == "${slug}"][0]{ _id, title, slug{current}, description, imgUrl{ asset->{ url } }, thumbnailImgUrl{ asset->{ url } } }`

  try {
    post = await sanityClient.fetch<Post>(GET_POST_BY_SLUG)
  } catch {
    isError = true
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Hero
        title={post.title}
        subtitle={''}
        imgHeight={350}
        imgUrl={post.thumbnailImgUrl?.asset?.url || ''}
      />
    </>
  )
}

export default PostPage
