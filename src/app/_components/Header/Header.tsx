import Link from 'next/link'
import Image from 'next/image'
import { Dongle } from 'next/font/google'

const dongle = Dongle({
  subsets: ['latin'],
  weight: '700',
})

const Header = () => {
  return (
    <header className=' bg-white w-full py-2 px-[10%]  font-bold  border-b-1 border-primary flex justify-between items-center'>
      <Link href={'/'}>
        <div className='flex items-center gap-4 text-primary mt-4 mx-3'>
          <Image
            src={'/assets/logo_cabala_noletters-removebg.png'}
            alt={'Cábala Viajera Logo'}
            width={130}
            height={130}
          />
          <h1 className={`${dongle.className} text-5xl sm:text-7xl font-bold`}>
            CÁBALA VIAJERA
          </h1>
        </div>
      </Link>
    </header>
  )
}

export default Header
