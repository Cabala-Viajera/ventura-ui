import { builder } from '@/app/_utils/sanity'
import Image from 'next/image'

export const PortableTextImage = ({
  value,
}: {
  value: {
    asset: { _ref: string }
    alt?: string
    crop?: { left: number; right: number; top: number; bottom: number }
  }
}) => {
  const dimensions = value.asset._ref.match(/-(\d+)x(\d+)-/)
  const originalWidth = dimensions ? Number(dimensions[1]) : 700
  const originalHeight = dimensions ? Number(dimensions[2]) : 400
  const width = Math.round(
    originalWidth * (1 - (value.crop?.left ?? 0) - (value.crop?.right ?? 0))
  )
  const height = Math.round(
    originalHeight * (1 - (value.crop?.top ?? 0) - (value.crop?.bottom ?? 0))
  )
  const isPortrait = height > width

  return (
    <div className='w-full my-6 md:my-10 rounded-lg'>
      <Image
        src={builder.image(value).width(700).fit('max').auto('format').url()}
        alt={value.alt || ''}
        width={width}
        height={height}
        sizes={
          isPortrait
            ? '(max-width: 500px) 100vw, 500px'
            : '(max-width: 700px) 100vw, 700px'
        }
        className={`w-full h-auto rounded-lg mx-auto shadow-lg ${
          isPortrait ? 'max-w-[500px]' : 'max-w-[700px]'
        }`}
      />
    </div>
  )
}
