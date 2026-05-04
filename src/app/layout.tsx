import React from 'react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Footer, Header } from '@components'
import './globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SOCIAL_LINKS } from './_utils/constants'
config.autoAddCss = false

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Cábala Viajera',
  description: 'Blog de viajes y experiencias personales alrededor del mundo.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} antialiased`}>
        <Header />
        {children}
        <Footer socialLinks={SOCIAL_LINKS} />
      </body>
    </html>
  )
}
