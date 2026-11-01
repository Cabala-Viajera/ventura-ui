import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale, getTranslations } from 'next-intl/server'
import { staticPath, staticAlternates } from '@/i18n/content'
import { SITE_URL } from '@/app/_utils/constants'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations()
  return {
    title: t('privacy'),
    description: t('privacyDescription'),
    openGraph: {
      title: t('privacy'),
      description: t('privacyDescription'),
      url: SITE_URL + staticPath(locale, 'privacy'),
      locale: locale === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('privacy'),
      description: t('privacyDescription'),
    },
    alternates: {
      canonical: SITE_URL + staticPath(locale, 'privacy'),
      ...staticAlternates('privacy'),
    },
    robots: { index: false, follow: true },
  }
}
const linkStyle =
  'rounded-sm underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4'
export default async function PrivacyPage() {
  const locale = await getLocale()
  const t = await getTranslations()
  const privacyUrl = SITE_URL + staticPath(locale, 'privacy')
  const rich = {
    site: (children: React.ReactNode) => (
      <a href={SITE_URL} className={linkStyle}>
        {children}
      </a>
    ),
    email: (children: React.ReactNode) => (
      <a href='mailto:admin@cabalaviajera.com' className={linkStyle}>
        {children}
      </a>
    ),
    privacy: (children: React.ReactNode) => (
      <a href={privacyUrl} className={linkStyle}>
        {children}
      </a>
    ),
  }
  const sections = [
    {
      id: 'responsable',
      title: t('privacySection0Title'),
      content: (
        <>
          <p>{t.rich('privacySection0Paragraph0', rich)}</p>
          <p>{t.rich('privacySection0Paragraph1', rich)}</p>
          <p>{t.rich('privacySection0Paragraph2', rich)}</p>
        </>
      ),
    },
    {
      id: 'datos-personales',
      title: t('privacySection1Title'),
      content: (
        <>
          <p>{t.rich('privacySection1Paragraph0', rich)}</p>
          <p className='list-item ml-6 list-disc'>
            {t.rich('privacySection1Paragraph1', rich)}
          </p>
          <p>{t.rich('privacySection1Paragraph2', rich)}</p>
        </>
      ),
    },
    {
      id: 'finalidades',
      title: t('privacySection2Title'),
      content: (
        <>
          <p>{t.rich('privacySection2Paragraph0', rich)}</p>
          <p className='list-item ml-6 list-disc'>
            {t.rich('privacySection2Paragraph1', rich)}
          </p>
          <p className='list-item ml-6 list-disc'>
            {t.rich('privacySection2Paragraph2', rich)}
          </p>
          <p className='list-item ml-6 list-disc'>
            {t.rich('privacySection2Paragraph3', rich)}
          </p>
          <p>{t.rich('privacySection2Paragraph4', rich)}</p>
        </>
      ),
    },
    {
      id: 'resend',
      title: t('privacySection3Title'),
      content: (
        <>
          <p>{t.rich('privacySection3Paragraph0', rich)}</p>
          <p>{t.rich('privacySection3Paragraph1', rich)}</p>
          <p>{t.rich('privacySection3Paragraph2', rich)}</p>
          <p>{t.rich('privacySection3Paragraph3', rich)}</p>
          <p>{t.rich('privacySection3Paragraph4', rich)}</p>
        </>
      ),
    },
    {
      id: 'estadisticas',
      title: t('privacySection4Title'),
      content: (
        <>
          <p>{t.rich('privacySection4Paragraph0', rich)}</p>
          <p>{t.rich('privacySection4Paragraph1', rich)}</p>
          <p>{t.rich('privacySection4Paragraph2', rich)}</p>
          <p>{t.rich('privacySection4Paragraph3', rich)}</p>
        </>
      ),
    },
    {
      id: 'cancelacion',
      title: t('privacySection5Title'),
      content: (
        <>
          <p>{t.rich('privacySection5Paragraph0', rich)}</p>
          <p>{t.rich('privacySection5Paragraph1', rich)}</p>
          <p>{t.rich('privacySection5Paragraph2', rich)}</p>
        </>
      ),
    },
    {
      id: 'solicitudes',
      title: t('privacySection6Title'),
      content: (
        <>
          <p>{t.rich('privacySection6Paragraph0', rich)}</p>
          <p>{t.rich('privacySection6Paragraph1', rich)}</p>
          <p>{t.rich('privacySection6Paragraph2', rich)}</p>
          <p>{t.rich('privacySection6Paragraph3', rich)}</p>
        </>
      ),
    },
    {
      id: 'conservacion',
      title: t('privacySection7Title'),
      content: (
        <>
          <p>{t.rich('privacySection7Paragraph0', rich)}</p>
          <p>{t.rich('privacySection7Paragraph1', rich)}</p>
        </>
      ),
    },
    {
      id: 'actualizaciones',
      title: t('privacySection8Title'),
      content: (
        <>
          <p>{t.rich('privacySection8Paragraph0', rich)}</p>
          <p>{t.rich('privacySection8Paragraph1', rich)}</p>
          <p>{t.rich('privacySection8Paragraph2', rich)}</p>
          <p>{t.rich('privacySection8Paragraph3', rich)}</p>
        </>
      ),
    },
  ]
  return (
    <main className='mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-20'>
      <Link href={staticPath(locale)} className={linkStyle}>
        {t('returnHome')}
      </Link>
      <header className='mt-6 border-b border-foreground/15 pb-8 sm:pb-12'>
        <p className='text-sm font-bold tracking-widest text-primary uppercase'>
          Cábala Viajera
        </p>
        <h1 className='mt-4 text-4xl font-bold tracking-tight sm:text-5xl'>
          {t('privacy')}
        </h1>
        <p className='mt-5 max-w-2xl text-base leading-8 text-foreground/75'>
          {t('privacyDescription')}
        </p>
        <p className='mt-6 max-w-2xl rounded-xl border border-secondary bg-secondary/15 p-4 text-sm leading-7'>
          <strong>{t('lastUpdated')}</strong>{' '}
          <time dateTime='2026-10-06'>{t('privacyDate')}</time>
          <br />
          {t('privacyIntro')}
        </p>
      </header>
      <div className='mt-10 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16'>
        <nav aria-label={t('privacyContents')}>
          <p className='mb-4 text-sm font-bold'>{t('onThisPage')}</p>
          <ol className='space-y-2'>
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`flex min-h-11 items-start gap-3 py-2 text-sm leading-6 ${linkStyle}`}
                >
                  <span aria-hidden='true' className='font-bold text-primary'>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className='space-y-10'>
          {sections.map(section => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className='scroll-mt-8 border-b border-foreground/10 pb-10 last:border-b-0'
            >
              <h2
                id={`${section.id}-heading`}
                className='text-xl font-bold sm:text-2xl'
              >
                {section.title}
              </h2>
              <div className='mt-4 space-y-4 text-base leading-8 text-foreground/75'>
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
