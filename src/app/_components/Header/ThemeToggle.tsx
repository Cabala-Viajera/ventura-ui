'use client'

import { useAtom } from 'jotai'
import { useTranslations } from 'next-intl'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { themePreferenceAtom } from '@/app/_utils/theme'

export function ThemeToggle() {
  const t = useTranslations('header')
  const [preference, setPreference] = useAtom(themePreferenceAtom)
  const dark = preference === 'dark'

  return (
    <button
      type='button'
      aria-label={t('darkMode')}
      aria-pressed={dark}
      onClick={() => setPreference(dark ? 'light' : 'dark')}
      className='inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-outline-variant text-on-surface transition-colors hover:bg-surface-container-low focus-visible:outline-2 focus-visible:outline-offset-2'
    >
      <FontAwesomeIcon icon={dark ? faSun : faMoon} aria-hidden />
    </button>
  )
}
