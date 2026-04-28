import Link from 'next/link'

const Header = () => {
  return (
    <header className=' bg-white w-full py-2 px-4  font-bold  border-b-1 border-primary flex justify-between items-center'>
      <Link href={'/'}>
        <div className='flex items-center gap-4 text-primary my-6 mx-3'>
          <h1 className='text-4xl'>Cábala Viajera</h1>
        </div>
      </Link>
    </header>
  )
}

export default Header
