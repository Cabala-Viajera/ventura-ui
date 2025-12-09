import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <section className='w-full border-b-4 border-primary'>
      <div className='relative w-full h-[300px] lg:h-[550px] aspect-video'>
        <Image
          src='/assets/hero01.jpg'
          alt='Hero Image'
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw'
          priority
        />
        <div className='absolute inset-0 bg-black/80'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
          <h2 className='text-3xl lg:text-6xl font-bold text-shadow-sm text-shadow-white  text-center'>
            Descubre tu próxima aventura
          </h2>
          <p className='mt-4 text-base lg:text-2xl'>
            Guias para mochileros y viajeros
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
