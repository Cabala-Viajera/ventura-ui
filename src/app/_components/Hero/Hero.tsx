import React from 'react'
import Image from 'next/image'

interface HeroProps {
  imgUrl?: string
  imgHeight?: number
  title?: string
  subtitle?: string
}

const Hero = (props: HeroProps) => {
  const { imgUrl } = props
  return (
    <section className='w-full border-b-4 border-primary'>
      <div
        className={`relative w-full h-[300px] lg:h-[550px] aspect-video`}
        style={{
          height:
            props.imgHeight !== undefined ? `${props.imgHeight}px` : undefined,
        }}
      >
        <Image
          src={imgUrl || '/assets/hero01.jpg'}
          alt={props.title || 'default hero image'}
          fill
          style={{ objectFit: 'cover' }}
          sizes='100vw'
          priority
        />
        <div className='absolute inset-0 bg-black/50'></div>
        <div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
          <h2 className='text-3xl lg:text-6xl font-bold text-shadow-sm text-shadow-white  text-center'>
            {props.title || ''}
          </h2>
          <p className='mt-6 text-base lg:text-xl'>{props.subtitle || ''}</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
