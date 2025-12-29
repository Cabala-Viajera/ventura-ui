import { Suspense } from 'react'
import { Hero, MainBlogList } from '@components'
import { MainBlogListSkeleton } from '@skeletons'

export default async function Page() {
  return (
    <>
      <Hero />
      <section className='flex justify-start my-8 px-4'>
        <div className='w-[100%] lg:w-[1200px]'>
          <Suspense fallback={<MainBlogListSkeleton />}>
            <MainBlogList />
          </Suspense>
        </div>
      </section>
    </>
  )
}
