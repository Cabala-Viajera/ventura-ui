import Image from 'next/image'

const Error = () => {
  return (
    <div className='my-10 px-4 text-center w-full flex flex-col items-center justify-center'>
      <Image
        src='/assets/not-found.png'
        alt='No posts'
        width={300}
        height={300}
        className='w-full max-w-[300px] h-auto'
      />
      <p className='text-gray-950 text-2xl sm:text-3xl font-bold my-6 sm:my-10'>
        Lo sentimos, algo salió mal
      </p>
    </div>
  )
}

export default Error
