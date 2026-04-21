import { Suspense } from 'react'
import { Hero, MainBlogList, ProfileBackpackers } from '@components'
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
            <ProfileBackpackers />
          </div>
        </Suspense>
      </section>
    </>
  )
}
