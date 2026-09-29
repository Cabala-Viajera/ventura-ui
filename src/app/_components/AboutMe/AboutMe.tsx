import Image from 'next/image'
import { JSX } from 'react'

export default function AboutMe(): JSX.Element {
  return (
    <div className='my-20'>
      <h2 className='m-10 text-4xl font-bold text-center lg:text-start'>
        Quienes somos
      </h2>
      <div className='flex flex-row items-center gap-10 mx-10'>
        <div>
          <div className='w-[200px] relative h-[200px]'>
            <Image
              fill
              priority={false}
              className='rounded-full object-cover shadow-xl/30'
              src='/defaultProfile.png'
              alt={'Quienes somos'}
              sizes='(max-width: 200px) 100vw, 200px'
            />
          </div>
        </div>
        <div className='text-justify p-10 w-[50%]'>
          <p>
            Hola! <br /> Mi nombre es Claudio, soy desarrollador de software y
            viajero mochilero. Eh visitado 8 paises y 20 ciudades alrededor del
            mundo en tres años y escribo este blog para compartir mis
            experiencias y poder ayudar a otros viajeros con las dudas que yo
            tenia cuando planeaba mis viajes. Me gusta cumplir mis sueños
            viajando y escuchar a otros compartir sus aventuras alrededor del
            mundo. Espero pueda animarte a descubrir tu próximo destino.
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
