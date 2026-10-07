import Image from 'next/image'
import { JSX } from 'react'

export default function AboutMe(): JSX.Element {
  return (
    <div className='mx-auto my-12 md:my-20 w-full max-w-[1400px] px-4 sm:px-6 lg:px-10'>
      <h2 className='my-6 md:my-10 text-2xl sm:text-4xl font-bold text-center lg:text-start'>
        Sobre mí
      </h2>
      <div className='flex flex-col md:flex-row items-center gap-4 md:gap-10 rounded-2xl bg-white p-5 md:p-8 shadow-md shadow-black/10'>
        <div className='shrink-0 mb-4 md:mb-0'>
          <div className='relative size-[150px] md:size-[200px]'>
            <Image
              fill
              priority={false}
              className='rounded-full object-cover shadow-sm shadow-black/10'
              src='/defaultProfile.png'
              alt={'Quienes somos'}
              sizes='(min-width: 768px) 200px, 150px'
            />
          </div>
        </div>
        <div className='w-full min-w-0 md:flex-1 text-left md:text-justify text-base md:text-lg'>
          <p>
            Hola! Mi nombre es Claudio, soy desarrollador de software y viajero
            mochilero. <br />
            Eh visitado 8 paises y 20 ciudades alrededor del mundo en tres años
            y escribo este blog para compartir mis experiencias y poder ayudar a
            otros viajeros con las dudas que yo tenia cuando planeaba mis
            viajes. Me gusta cumplir mis sueños viajando y escuchar a otros
            compartir sus aventuras alrededor del mundo. Espero pueda animarte a
            descubrir tu próximo destino.
            <br />
            <br />
            <span className='italic'>
              Mi objetivo viajero es darle la vuelta al mundo en 6 meses.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
