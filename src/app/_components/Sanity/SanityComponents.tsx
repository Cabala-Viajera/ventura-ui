import { builder } from '@/app/_utils/sanity'
import Image from 'next/image'

export const PortableTextImage = ({
  value,
}: {
  value: { asset: { _ref: string }; alt?: string }
}) => {
  return (
    <div className='relative w-full h-96 my-10 rounded-lg'>
      <Image
        src={builder
          .image(value)
          .width(700)
          .height(400)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ''}
        width={700}
        height={400}
        sizes='(max-width: 768px) 100vw, 700px'
        className='object-contain rounded-lg text-center mx-auto shadow-lg'
      />
    </div>
  )
}
