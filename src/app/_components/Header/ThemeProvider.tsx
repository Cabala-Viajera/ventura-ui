'use client'

import { Provider, useStore } from 'jotai'
import { useEffect, type ReactNode } from 'react'
import { themePreferenceAtom } from '@/app/_utils/theme'

function ThemeAttribute() {
  const store = useStore()

  useEffect(() => {
    function applyPreference() {
      const preference = store.get(themePreferenceAtom)
      if (preference) {
        document.documentElement.dataset.theme = preference
      } else {
        delete document.documentElement.dataset.theme
      }
    }

    const unsubscribe = store.sub(themePreferenceAtom, applyPreference)
    applyPreference()
    return unsubscribe
  }, [store])

  return null
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <ThemeAttribute />
      {children}
    </Provider>
  )
}
