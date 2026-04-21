import { Card, Error } from '@components'
import { sanityClient } from '@utils/sanityClient'
import Image from 'next/image'
import { JSX } from 'react'
import Link from 'next/link'
import { Post } from '@/app/_models/Post'

const POSTS_QUERY = `*[_type == "post"][0...6]{ _id, title, slug{current}, description, imgUrl{ asset->{ url } } }`

export default async function MainBlogList(): Promise<JSX.Element> {
  let posts: Post[] = []
  let isError = false

  try {
    const result = await sanityClient.fetch<Post[]>(POSTS_QUERY)
    posts = Array.isArray(result) ? result : []
  } catch {
    isError = true
  }

  if (isError) {
    return <Error />
  }

  return (
    <div className='w-full xl:w-2/3'>
      <h2 className='m-10 text-4xl font-bold text-center lg:text-start'>
        Últimas publicaciones
      </h2>
      <div className='m-0 lg:m-10 flex flex-wrap gap-6 items-center justify-center lg:justify-start w-[1200px]'>
        {posts.length > 0 ? (
          posts.map(post =>
            post.slug?.current ? (
              <Link key={post._id} href={`/${post.slug?.current}`}>
                <Card
                  title={post.title}
                  description={post.description}
                  imgUrl={post.imgUrl?.asset?.url}
                />
              </Link>
            ) : (
              <Card
                key={post._id}
                title={post.title}
                description={post.description}
                imgUrl={post.imgUrl?.asset?.url}
              />
            )
          )
        ) : (
          <div className='flex flex-col items-center justify-center w-[100%] gap-6'>
            <Image
              src='/assets/not-found.png'
              alt='No posts'
              width={400}
              height={400}
            />
            <p className={`text-gray-950 text-4xl font-bold -ml-24`}>
              Nada por aquí
            </p>
          </div>
        )}
      </div>
      <div className=' mt-5 text-center w-[1200px]'>
        <Link
          href='#'
          className='mt-4  text-primary font-bold  cursor-pointer underline text-xl hover:opacity-80 transition-opacity'
          aria-label='Ver historia del mochilero'
        >
          Ver más
        </Link>
      </div>
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
          <div className='text-justify p-10'>
            <p>
              Hola! <br /> Mi nombre es Claudio, soy desarrollador de software y
              viajero mochilero. Eh visitado 8 paises y 20 ciudades alrededor
              del mundo en tres años y escribo este blog para compartir mis
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
    </div>
  )
}
