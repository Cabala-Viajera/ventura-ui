'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { staticPath } from '@/i18n/content-paths'

export function LanguageSwitcher({
  onLanguageChange,
}: {
  onLanguageChange?: () => void
}) {
  const locale = useLocale()
  const router = useRouter()
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const optionsId = useId()
  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (!dropdown.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])
  return (
    <nav
      aria-label={t('switchLanguage')}
      className='flex shrink-0 flex-col items-end text-label-lg'
    >
      <div
        ref={dropdown}
        className='relative'
        onBlur={event => {
          if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
        }}
        onKeyDown={event => {
          if (event.key === 'Escape' && open) {
            event.preventDefault()
            setOpen(false)
            trigger.current?.focus()
          }
        }}
      >
        <button
          ref={trigger}
          type='button'
          aria-label={`${t('switchLanguage')}: ${locale.toUpperCase()}`}
          aria-expanded={open}
          aria-controls={optionsId}
          onClick={() => setOpen(!open)}
          className='inline-flex min-h-11 cursor-pointer items-center gap-gutter-xs rounded-full border border-outline-variant px-3 transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2'
        >
          {locale.toUpperCase()}
          <svg
            aria-hidden='true'
            viewBox='0 0 16 16'
            className={`h-4 w-4 ${open ? 'rotate-180' : ''}`}
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
          >
            <path d='m4 6 4 4 4-4' />
          </svg>
        </button>
        {open && (
          <div
            id={optionsId}
            className='absolute right-0 z-50 mt-gutter-xs w-full overflow-hidden rounded-sm border border-outline-variant bg-surface-container-lowest shadow-sm'
          >
            {(['es', 'en'] as const).map(language => (
              <button
                key={language}
                type='button'
                lang={language}
                aria-current={language === locale ? 'true' : undefined}
                onClick={() => {
                  setOpen(false)
                  trigger.current?.focus()
                  if (language !== locale) {
                    onLanguageChange?.()
                    router.push(staticPath(language))
                  }
                }}
                className='block min-h-11 w-full cursor-pointer px-3 text-left hover:bg-surface-container-low focus-visible:bg-surface-container-low focus-visible:outline-2 focus-visible:-outline-offset-2'
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
