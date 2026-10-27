import { Suspense } from 'react'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import { Link } from '@/i18n/navigation'
import Image from 'next/image'
import { Dongle } from 'next/font/google'

const dongle = Dongle({
  subsets: ['latin'],
  weight: '700',
})

const Header = () => {
  return (
    <header className='bg-white w-full gap-3 py-2 px-4 sm:px-6 lg:px-[10%] font-bold border-b-1 border-primary flex justify-between items-center'>
      <Link href={'/'} className='min-w-0 max-w-full'>
        <div className='flex items-center gap-2 sm:gap-4 text-primary sm:mt-4 sm:mx-3'>
          <Image
            src={'/assets/logo_cabala_noletters-removebg.png'}
            alt={'Cábala Viajera Logo'}
            width={130}
            height={130}
            sizes='(max-width: 640px) 64px, 130px'
            className='w-16 h-auto shrink-0 sm:w-[130px]'
          />
          <h1
            className={`${dongle.className} min-w-0 text-3xl leading-none sm:text-6xl lg:text-7xl font-bold`}
          >
            CÁBALA VIAJERA
          </h1>
        </div>
      </Link>
      <Suspense>
        <LanguageSwitcher />
      </Suspense>
    </header>
  )
}

export default Header
