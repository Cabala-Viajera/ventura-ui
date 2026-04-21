import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface ProfileBackpackersProps {
  title?: string
  imageUrl?: string
  imageAlt?: string

  children?: React.ReactNode
}

const ProfileBackpackers: FC<ProfileBackpackersProps> = ({
  title = 'Mochileros destacados',
  imageUrl = '/defaultProfile.png',
  imageAlt = 'Mochileros destacados',
}) => {
  return (
    <div className='w-full xl:w-1/3'>
      <h2 className='my-10 text-4xl font-bold'>{title}</h2>
      <div className='w-[350px] relative h-[500px]'>
        <Image
          fill
          priority={false}
          className='rounded-2xl object-cover shadow-lg'
          src={imageUrl}
          alt={imageAlt}
          sizes='(max-width: 500px) 100vw, 350px'
        />
      </div>
      <div className='w-[350px] mt-5 text-center'>
        <Link
          href='#'
          className='mt-4 text-primary font-bold  cursor-pointer underline text-xl hover:opacity-80 transition-opacity'
          aria-label='Ver historia del mochilero'
        >
          Ver historia
        </Link>
      </div>
    </div>
  )
}

export default ProfileBackpackers
