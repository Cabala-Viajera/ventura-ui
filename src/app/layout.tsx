import React from 'react'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Footer, Header } from '@components'
import './globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SITE_URL, SOCIAL_LINKS } from './_utils/constants'
config.autoAddCss = false

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
})

const title = 'Cábala Viajera'
const description =
  'Blog de viajes y experiencias personales alrededor del mundo.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: title,
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${roboto.className} antialiased`}>
        <Header />
        {children}
        <Footer socialLinks={SOCIAL_LINKS} />
      </body>
    </html>
  )
}
