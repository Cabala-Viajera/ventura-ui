import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { staticAlternates, staticPath } from '@/i18n/content'
import React from 'react'
import type { Metadata } from 'next'
import { Crimson_Pro, Recursive, Spline_Sans_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TravelFooter, Header } from '@components'
import '../globals.css'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SITE_URL } from '../_utils/constants'
config.autoAddCss = false

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-pro',
})

const recursive = Recursive({
  subsets: ['latin'],
  variable: '--font-recursive',
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-spline-sans-mono',
})

const title = 'Cábala Viajera'
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale })
  const description = t('siteDescription')
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${title}` },
    description,
    alternates: {
      canonical: SITE_URL + staticPath(locale),
      ...staticAlternates('home'),
    },
    openGraph: {
      title,
      description,
      url: SITE_URL + staticPath(locale),
      siteName: title,
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    icons: {
      icon: [
        { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
  }
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return (
    <html
      lang={locale}
      className={`${crimsonPro.variable} ${recursive.variable} ${splineSansMono.variable}`}
    >
      <body className='antialiased'>
        <NextIntlClientProvider>
          <Header />
          {children}
          <TravelFooter />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
