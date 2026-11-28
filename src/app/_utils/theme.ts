import { atomWithStorage } from 'jotai/utils'

const THEME_STORAGE_KEY = 'cabala-theme'

type ThemePreference = 'light' | 'dark' | null

function parseTheme(value: string | null): ThemePreference {
  return value === 'light' || value === 'dark' ? value : null
}

function writeTheme(key: string, value: ThemePreference) {
  try {
    if (value === null) {
      window.localStorage.removeItem(key)
    } else {
      window.localStorage.setItem(key, value)
    }
  } catch {
    // The atom still keeps the current page's preference.
  }
}

export const themePreferenceAtom = atomWithStorage<ThemePreference>(
  THEME_STORAGE_KEY,
  null,
  {
    getItem(key) {
      try {
        return parseTheme(window.localStorage.getItem(key))
      } catch {
        return null
      }
    },
    setItem: writeTheme,
    removeItem(key) {
      writeTheme(key, null)
    },
    subscribe(key, onChange) {
      let storage: Storage
      try {
        storage = window.localStorage
      } catch {
        return () => {}
      }

      function onStorage(event: StorageEvent) {
        if (
          event.storageArea === storage &&
          (event.key === key || event.key === null)
        ) {
          onChange(parseTheme(event.newValue))
        }
      }

      window.addEventListener('storage', onStorage)
      return () => window.removeEventListener('storage', onStorage)
    },
  }
)
