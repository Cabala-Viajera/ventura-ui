import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export const PortableTextAlert = ({
  value,
}: {
  value: { _type: 'alert'; title?: string; body?: PortableTextBlock[] }
}) => (
  <aside className='my-6 flex gap-3 rounded-lg border border-foreground/20 bg-primary/15 p-4 text-left text-foreground sm:p-5'>
    <span className='shrink-0 text-2xl' aria-hidden='true'>
      📍
    </span>
    <div className='min-w-0 flex-1 italic'>
      {value.title && <p className='mb-2 font-bold'>{value.title}</p>}
      {Array.isArray(value.body) && (
        <div className='[&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&>:last-child]:mb-0'>
          <PortableText value={value.body} />
        </div>
      )}
    </div>
  </aside>
)
