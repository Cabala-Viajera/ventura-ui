import Image from 'next/image'

const Error = () => {
  return (
    <div className='m-10 text-center h-[400px] flex flex-col items-center justify-center'>
      <Image
        src='/assets/not-found.png'
        alt='No posts'
        width={300}
        height={300}
      />
      <p className='text-gray-950 text-3xl font-bold m-10 -ml-10'>
        Lo sentimos, algo salió mal
      </p>
    </div>
  )
}

export default Error
