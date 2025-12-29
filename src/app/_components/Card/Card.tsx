import React from 'react'
import Image from 'next/image'

interface CardProps {
  title: string
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className='relative w-[350px] h-[250px] cursor-pointer'>
        <Image
          src='/assets/post/corea_post.jpg'
          alt='Corea Post'
          fill
          className='object-[35%_25%] object-cover rounded-2xl shadow-xl/30'
        />
        <div className='absolute inset-0 bg-black/60 rounded-2xl'></div>
        <div className='absolute bottom-5 left-5 text-white  text-shadow-sm/10 text-shadow-white'>
          <h3 className='text-2xl font-bold '>{props.title}</h3>
          <p className='text-sm mt-1'>
            Por Claudio Moreno &bull; 5 min de lectura
          </p>
        </div>
      </div>
    </>
  )
}

export default Card
