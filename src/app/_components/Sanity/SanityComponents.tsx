import { builder } from '@/app/_utils/sanity'
import Image from 'next/image'

export const PortableTextImage = ({
  value,
}: {
  value: { asset: { _ref: string }; alt?: string }
}) => {
  return (
    <div className='w-full my-6 md:my-10 rounded-lg'>
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
        className='w-full max-w-[700px] h-auto object-contain rounded-lg mx-auto shadow-lg'
      />
    </div>
  )
}
