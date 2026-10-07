import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NewsletterForm } from '../NewsletterForm'
import {
  FOOTER_SOCIALS,
  type TravelFooterSection,
  type TravelFooterSocial,
} from './data'
import { Dongle } from 'next/font/google'

export interface TravelFooterProps {
  brandName?: string
  tagline?: string
  copyrightText?: string
  sections?: TravelFooterSection[]
  socialLinks?: TravelFooterSocial[]
}

const focusStyle =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'

const dongle = Dongle({
  subsets: ['latin'],
  weight: '700',
})

export default function TravelFooter({
  brandName = 'Cábala Viajera',
  tagline = 'Guías para mochileros y viajeros con presupuesto',
  copyrightText = '© 2026 Cábala Viajera. Todos los derechos reservados.',
  socialLinks = FOOTER_SOCIALS,
}: TravelFooterProps) {
  return (
    <footer className='relative isolate overflow-hidden bg-primary/90 text-foreground'>
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-secondary)_25%,transparent),transparent_65%)]'
      />
      <svg
        aria-hidden='true'
        focusable='false'
        viewBox='0 0 1440 64'
        preserveAspectRatio='none'
        className='pointer-events-none absolute inset-x-0 top-0 h-8 w-full text-primary/80 sm:h-12'
      >
        <path
          d='M0 0H1440V12C1150 65 990 4 740 25S260 66 0 20Z'
          fill='currentColor'
        />
        <path
          d='M0 20C260 66 490 46 740 25S1150 65 1440 12'
          fill='none'
          stroke='currentColor'
        />
      </svg>
      <svg
        aria-hidden='true'
        focusable='false'
        viewBox='0 0 330 180'
        className='pointer-events-none absolute -right-10 top-12 -z-10 w-64 text-foreground/90 lg:right-4 lg:w-80'
        fill='none'
      >
        <path
          d='M10 150C45 68 158 176 180 103C198 43 95 40 124 95S248 123 272 44'
          stroke='currentColor'
          strokeWidth='1.5'
          strokeDasharray='5 7'
        />
        <path
          d='m256 35 58-20-19 56-12-24-27-12Z M283 47l31-32'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinejoin='round'
        />
      </svg>
      <div className='mx-auto max-w-7xl px-6 pt-20 pb-8 sm:px-10 sm:pt-24 lg:px-12'>
        <div className='grid gap-10 lg:grid-cols-[1fr_1.3fr_1.1fr] lg:gap-8 xl:gap-10'>
          <section aria-label={brandName} className='lg:pr-2'>
            <Link
              href='/'
              className={`inline-flex items-center gap-3 rounded-sm ${focusStyle}`}
            >
              <span
                className={`font-serif text-5xl leading-tight tracking-tight ${dongle.className} tex`}
              >
                {brandName}
              </span>
            </Link>
            <p className='max-w-64 text-sm leading-7 text-foreground'>
              {tagline}
            </p>

            <p className='mt-5 font-serif text-lg italic text-foreground'>
              Buenas rutas,
              <br />
              mejores historias
            </p>
          </section>

          <div className='border-t border-foreground/20 pt-9 lg:border-t-0 lg:border-l lg:px-8 lg:pt-0 xl:px-10'>
            <NewsletterForm />
          </div>

          <section
            aria-label='Síguenos'
            className='border-t border-foreground/20 pt-9 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 xl:pl-10'
          >
            <h2 className='text-lg font-bold'>Síguenos</h2>
            <p className='mt-3 max-w-sm text-sm leading-7 text-foreground'>
              Únete a nuestra comunidad viajera y comparte tus propias
              aventuras.
            </p>
            <ul
              className='mt-6 flex flex-wrap gap-2.5 lg:gap-1 xl:gap-2.5'
              aria-label='Redes sociales'
            >
              {socialLinks.map(({ label, icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`${label} (abre en una pestaña nueva)`}
                    className={`flex size-11 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-white motion-reduce:transition-none ${focusStyle}`}
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      aria-hidden='true'
                      className='size-4'
                    />
                  </a>
                </li>
              ))}
            </ul>
            {/* <p className='mt-5 text-xs tracking-wide text-foreground'>
              El viaje sigue, también aquí.
            </p> */}
          </section>
        </div>

        {/* <nav
          aria-label='Navegación del pie de página'
          className='mt-12 grid grid-cols-2 gap-x-6 gap-y-9 border-t border-foreground/20 pt-10 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5 lg:gap-8 lg:pt-12'
        >
          {sections.map(section => (
            <div key={section.title}>
              <h2 className='mb-3 text-sm font-bold tracking-wide text-foreground'>
                {section.title}
              </h2>
              <ul>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className={`inline-flex min-h-11 items-center rounded-sm py-2 text-sm leading-5 text-foreground transition-colors hover:text-foreground/75 hover:underline motion-reduce:transition-none ${focusStyle}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav> */}

        <div className='mt-10 flex flex-col gap-4 border-t border-foreground/20 pt-7 text-xs leading-6 sm:flex-row sm:items-center sm:justify-between'>
          <p>{copyrightText}</p>
          <Link
            href='/privacidad'
            className={`inline-flex min-h-11 items-center rounded-sm underline underline-offset-4 hover:text-foreground/75 ${focusStyle}`}
          >
            Aviso de privacidad
          </Link>
          <p className='tracking-wider text-foreground'>
            Explora · Descubre · Vive · Comparte
          </p>
        </div>
      </div>
    </footer>
  )
}
