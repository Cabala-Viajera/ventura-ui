import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { JSX } from 'react'

export default function AboutMe(): JSX.Element {
  const t = useTranslations()
  return (
    <div className='mx-auto my-12 md:my-20 w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>
      <h2 className='my-6 md:my-10 text-2xl sm:text-4xl font-bold text-center lg:text-start'>
        {t('about')}
      </h2>
      <div className='flex flex-col md:flex-row items-center gap-4 md:gap-10 rounded-2xl bg-white p-5 md:p-8 shadow-md shadow-black/10'>
        <div className='shrink-0 mb-4 md:mb-0'>
          <div className='relative size-[150px] md:size-[200px]'>
            <Image
              fill
              priority={false}
              className='rounded-full object-cover shadow-sm shadow-black/10'
              src='/defaultProfile.png'
              alt={t('aboutAlt')}
              sizes='(min-width: 768px) 200px, 150px'
            />
          </div>
        </div>
        <div className='w-full min-w-0 md:flex-1 text-left md:text-justify text-base md:text-lg'>
          <p>
            {t('aboutBio')}
            <br />
            {t('aboutStory')}
            <br />
            <br />
            <span className='italic'>{t('aboutGoal')}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
