import React from 'react'
import Image from 'next/image'

interface CardProps {
  title: string
  description: string
  imgUrl?: string
}

const Card = (props: CardProps) => {
  return (
    <>
      <div className='relative w-[350px] h-[250px] cursor-pointer'>
        <Image
          src={props.imgUrl || '/assets/post/corea_post.jpg'}
          alt={props.title}
          fill
          sizes='(max-width: 350px) 100vw, 350px'
          className='object-[35%_25%] object-cover rounded-2xl shadow-xl/30'
        />
        <div className='absolute inset-0 bg-black/60 rounded-2xl'></div>
        <div className='absolute bottom-5 left-5 text-white  text-shadow-sm/10 text-shadow-white'>
          <h3 className='text-2xl font-bold '>{props.title || 'Sin título'}</h3>
          <p className='text-sm mt-1'>{props.description || 'No disponible'}</p>
        </div>
      </div>
    </>
  )
}

export default Card
