import Link from 'next/link'

const Header = () => {
  return (
    <div className=' bg-white w-full py-2 px-4  font-bold  border-b-1 border-primary flex justify-between items-center'>
      <Link href={'/'}>
        <div className='flex items-center gap-4 text-primary my-6 mx-3'>
          <h1 className='text-4xl'>Cábala Viajera</h1>
        </div>
      </Link>
      <div className='text-bold'>
        <nav className='text-3xl'>
          <Link href='/' className='mr-4'>
            Blog
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header
