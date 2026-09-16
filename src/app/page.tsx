import { Suspense } from 'react'
import { AboutMe, Hero, MainBlogList } from '@components'
import { MainBlogListSkeleton } from '@skeletons'

export default async function Page() {
  return (
    <>
      <Hero
        title='Descubre tu próxima aventura'
        subtitle='Guia para mochileros y viajeros frecuentes'
      />
      <section>
        <Suspense fallback={<MainBlogListSkeleton />}>
          <div className='flex flex-col xl:flex-row'>
            <MainBlogList />
          </div>
        </Suspense>
      </section>
      <AboutMe />
    </>
  )
}
