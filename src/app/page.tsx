import { Suspense } from 'react'
import { Hero, MainBlogList } from '@components'
import { MainBlogListSkeleton } from '@skeletons'

export default async function Page() {
  return (
    <>
      <Hero />
      <section className='lg:w-[50%]'>
        <Suspense fallback={<MainBlogListSkeleton />}>
          <MainBlogList />
        </Suspense>
      </section>
    </>
  )
}
