import Link from 'next/link'
import Image from 'next/image'
import { Dongle } from 'next/font/google'

const dongle = Dongle({
  subsets: ['latin'],
  weight: '700',
})

const Header = () => {
  return (
    <header className='bg-white w-full py-2 px-4 sm:px-6 lg:px-[10%] font-bold border-b-1 border-primary flex justify-between items-center'>
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
            className={`${dongle.className} min-w-0 text-4xl leading-none sm:text-7xl font-bold`}
          >
            CÁBALA VIAJERA
          </h1>
        </div>
      </Link>
    </header>
  )
}

export default Header
