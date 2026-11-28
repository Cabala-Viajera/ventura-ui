'use client'

import { Suspense, useId, useRef, useState, type MouseEvent } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePathname } from '@/i18n/navigation'
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher'
import { ThemeToggle } from './ThemeToggle'

const navItem =
  'inline-flex min-h-11 items-center border-b-2 border-transparent text-left text-title-md whitespace-nowrap text-on-surface-variant transition-colors hover:text-on-surface aria-[current=true]:border-primary aria-[current=true]:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2'

const primaryAction =
  'inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-primary px-gutter-lg text-title-md whitespace-nowrap text-on-primary transition-colors hover:bg-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2'

type ArticleSection = 'chronicles' | 'backpackerRoutes'
type UpcomingFeature = 'myTrips' | 'planTrip'

function ArticleLinks({
  active,
  onNavigate,
}: {
  active?: ArticleSection
  onNavigate: () => void
}) {
  const t = useTranslations('header')
  return (
    <>
      <Link
        href='/articulos'
        aria-current={active === 'chronicles' ? 'true' : undefined}
        className={navItem}
        onNavigate={onNavigate}
      >
        {t('chronicles')}
      </Link>
      <Link
        href={{ pathname: '/articulos', query: { q: t('routeQuery') } }}
        aria-current={active === 'backpackerRoutes' ? 'true' : undefined}
        className={navItem}
        onNavigate={onNavigate}
      >
        {t('backpackerRoutes')}
      </Link>
    </>
  )
}

function ArticleIndexLinks({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations('header')
  const search = useSearchParams()
  return (
    <ArticleLinks
      active={
        search.get('q') === t('routeQuery') ? 'backpackerRoutes' : 'chronicles'
      }
      onNavigate={onNavigate}
    />
  )
}

export default function Header() {
  const t = useTranslations('header')
  const pathname = usePathname()
  const BrandTitle = pathname === '/' ? 'h1' : 'span'
  const [menuOpen, setMenuOpen] = useState(false)
  const [feature, setFeature] = useState<UpcomingFeature>('myTrips')
  const panelId = useId()
  const dialogTitleId = useId()
  const dialogDescriptionId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const dialogTrigger = useRef<HTMLButtonElement>(null)
  const closeMenu = () => setMenuOpen(false)

  function showUpcoming(
    event: MouseEvent<HTMLButtonElement>,
    selectedFeature: UpcomingFeature
  ) {
    dialogTrigger.current = event.currentTarget
    flushSync(() => setFeature(selectedFeature))
    dialog.current?.showModal()
  }

  return (
    <header
      className='sticky top-0 z-40 border-b border-outline-variant bg-surface text-on-surface'
      onKeyDown={event => {
        if (
          event.key === 'Escape' &&
          !event.defaultPrevented &&
          menuOpen &&
          !dialog.current?.open
        ) {
          closeMenu()
          menuButton.current?.focus()
        }
      }}
    >
      <div className='mx-auto grid w-full max-w-editorial grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-x-gutter-sm px-gutter-md py-gutter-sm sm:px-page-margin lg:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] lg:gap-x-gutter-md lg:py-gutter-md xl:gap-x-gutter-lg'>
        <Link
          href='/'
          onNavigate={closeMenu}
          className='flex min-h-11 min-w-0 items-center gap-gutter-sm rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          <Image
            src='/assets/logo_cabala_noletters.png'
            alt=''
            width={44}
            height={44}
            className='size-10 shrink-0 rounded-full lg:size-11'
          />
          <BrandTitle className='font-serif text-headline-sm whitespace-nowrap text-primary lg:text-headline-md'>
            Cábala Viajera
          </BrandTitle>
        </Link>
        <Image
          src='/assets/header-avatar.webp'
          alt={t('avatar')}
          width={36}
          height={36}
          className='size-9 rounded-full border border-outline-variant object-cover lg:col-start-4 lg:row-start-1'
        />
        <button
          ref={menuButton}
          type='button'
          aria-label={t('menu')}
          aria-expanded={menuOpen}
          aria-controls={panelId}
          onClick={() => setMenuOpen(open => !open)}
          className='inline-flex size-11 cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden'
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} aria-hidden />
        </button>
        <div
          id={panelId}
          className={`col-span-full mt-gutter-sm max-h-[calc(100dvh-4rem)] flex-col items-start gap-gutter-md overflow-y-auto border-t border-outline-variant py-gutter-md lg:contents ${menuOpen ? 'flex' : 'hidden'}`}
        >
          <nav
            aria-label={t('navigation')}
            className='flex flex-col items-start gap-gutter-xs lg:col-start-2 lg:row-start-1 lg:flex-row lg:items-center lg:justify-center lg:gap-gutter-md xl:gap-gutter-lg'
          >
            {pathname === '/articulos' ? (
              <Suspense fallback={<ArticleLinks onNavigate={closeMenu} />}>
                <ArticleIndexLinks onNavigate={closeMenu} />
              </Suspense>
            ) : (
              <ArticleLinks
                active={
                  pathname === '/' || pathname === '/[slug]'
                    ? 'chronicles'
                    : undefined
                }
                onNavigate={closeMenu}
              />
            )}
            <button
              type='button'
              aria-haspopup='dialog'
              onClick={event => showUpcoming(event, 'myTrips')}
              className={`${navItem} cursor-pointer`}
            >
              {t('myTrips')}
            </button>
          </nav>
          <div className='flex items-center gap-gutter-sm lg:col-start-3 lg:row-start-1'>
            <LanguageSwitcher onLanguageChange={closeMenu} />
            <ThemeToggle />
          </div>
          <button
            type='button'
            aria-haspopup='dialog'
            onClick={event => showUpcoming(event, 'planTrip')}
            className={`${primaryAction} lg:col-start-5 lg:row-start-1`}
          >
            {t('planTrip')}
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        onClose={() => dialogTrigger.current?.focus()}
        className='fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm rounded-lg border border-outline-variant bg-surface p-gutter-lg text-on-surface shadow-lg backdrop:bg-black/50'
      >
        <h2 id={dialogTitleId} className='text-headline-md'>
          {t(feature)}
        </h2>
        <p
          id={dialogDescriptionId}
          className='mt-gutter-sm text-on-surface-variant'
        >
          {t('comingSoon')}
        </p>
        <form method='dialog' className='mt-gutter-lg'>
          <button className={primaryAction}>{t('close')}</button>
        </form>
      </dialog>
    </header>
  )
}
