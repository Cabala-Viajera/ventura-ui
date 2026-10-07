import { Suspense } from 'react'
import { AboutMe, Hero, MainBlogList } from '@components'
import { MainBlogListSkeleton } from '@skeletons'

export default async function Page() {
  return (
    <>
      <Hero
        title='Descubre tu próxima aventura'
        subtitle='Guia para mochileros y viajeros con presupuesto'
      />
      <section className='mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>
        <Suspense fallback={<MainBlogListSkeleton />}>
          <MainBlogList />
        </Suspense>
      </section>
      <AboutMe />
    </>
  )
}
