import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <Image
        src='/assets/not-found.png'
        alt='Not Found'
        width={400}
        height={300}
      />
      <div className='w-[400px] text-center flex flex-col gap-4'>
        <h2 className='text-4xl font-bold'>Ruta no encontrada</h2>
        <Link href='/'>
          <p className='text-primary font-bold text-xl underline'>
            Regresar a la página principal
          </p>
        </Link>
      </div>
    </div>
  )
}
