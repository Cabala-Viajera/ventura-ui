import { vi } from 'vitest'

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img alt={alt} src={src} />
  ),
}))

vi.mock('next/font/google', () => ({
  Dongle: () => ({ className: '', variable: '', style: {} }),
}))
