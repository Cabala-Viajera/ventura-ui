import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, Error, Pagination, SearchBar } from '@components'
import { sanityClient } from '@utils/sanityClient'
import { Post } from '@/app/_models/Post'
import { SITE_URL } from '../_utils/constants'

const PAGE_SIZE = 10

const buildPostsPageQuery = (isSearching: boolean) => {
  const filter = isSearching
    ? `_type == "post" && (title match $terms || description match $terms)`
    : `_type == "post"`

  return `{
  "posts": *[${filter}] | order(_createdAt desc) [$start...$end]{ _id, title, slug{current}, description, imgUrl{ asset->{ url } } },
  "total": count(*[${filter}])
}`
}

interface PostsPage {
  posts: Post[]
  total: number
}

type SearchParams = Promise<{
  page?: string | string[]
  q?: string | string[]
}>

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

const parsePage = (value: string | string[] | undefined) => {
  const page = Number(firstValue(value))
  return Number.isInteger(page) && page >= 1 ? page : 1
}

const parseQuery = (value: string | string[] | undefined) =>
  (firstValue(value) ?? '').trim().slice(0, 100)

// Each word becomes a prefix pattern; GROQ `match` requires all of them.
const toSearchTerms = (query: string) =>
  query
    .split(/\s+/)
    .filter(Boolean)
    .map(word => `${word.replace(/\*/g, '')}*`)
    .filter(term => term.length > 1)

export const metadata: Metadata = {
  title: 'Todos los artículos',
  description: 'Todas las publicaciones de Cábala Viajera.',
  alternates: { canonical: `${SITE_URL}/articulos` },
}

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams
}) => {
  const params = await searchParams
  const currentPage = parsePage(params.page)
  const query = parseQuery(params.q)
  const terms = toSearchTerms(query)
  const start = (currentPage - 1) * PAGE_SIZE

  let data: PostsPage | null = null
  try {
    data = await sanityClient.fetch<PostsPage>(
      buildPostsPageQuery(terms.length > 0),
      { start, end: start + PAGE_SIZE, terms }
    )
  } catch {
    data = null
  }

  if (!data) {
    return <Error />
  }

  const { posts, total } = data
  const totalPages = Math.ceil(total / PAGE_SIZE)

  if (currentPage > 1 && currentPage > totalPages) {
    notFound()
  }

  return (
    <>
      <section className='px-[25%] py-30'>
        <div className='mb-10'>
          <SearchBar action='/articulos' defaultValue={query} />
        </div>
        <div className='flex flex-wrap gap-6 items-start justify-start min-h-[70vh]'>
          {posts.length > 0 ? (
            posts.map(post =>
              post.slug?.current ? (
                <Link key={post._id} href={`/${post.slug.current}`}>
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
            <div className='flex flex-col items-center justify-center w-full gap-6'>
              <Image
                src='/assets/not-found.png'
                alt='No posts'
                width={400}
                height={400}
              />
              <p className='text-gray-950 text-4xl font-bold'>Nada por aquí</p>
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath='/articulos'
          query={query}
        />
      </section>
    </>
  )
}

export default ArticlesPage
