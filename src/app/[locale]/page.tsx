import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import { AboutMe, Hero, MainBlogList } from '@components'
import { MainBlogListSkeleton } from '@skeletons'

export default async function Page() {
  const t = await getTranslations()
  return (
    <>
      <Hero title={t('heroTitle')} subtitle={t('heroSubtitle')} />
      <section className='mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>
        <Suspense fallback={<MainBlogListSkeleton />}>
          <MainBlogList />
        </Suspense>
      </section>
      <AboutMe />
    </>
  )
}
