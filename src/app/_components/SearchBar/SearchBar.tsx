'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface SearchBarProps {
  action: string
  defaultValue?: string
  placeholder?: string
}

const SearchBar = ({
  action,
  defaultValue = '',
  placeholder = 'Buscar artículos',
}: SearchBarProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(defaultValue)
  const [syncedDefault, setSyncedDefault] = useState(defaultValue)

  // Keep the input in sync when the URL changes (e.g. browser back/forward)
  if (defaultValue !== syncedDefault) {
    setSyncedDefault(defaultValue)
    setValue(defaultValue)
  }

  // Searching only happens on submit, but emptying the input while a search is
  // active goes back to the default list.
  const isCleared = value.trim() === '' && defaultValue.trim() !== ''

  useEffect(() => {
    if (!isCleared) return
    startTransition(() => {
      router.replace(action)
    })
  }, [isCleared, action, router])

  return (
    <form
      action={action}
      method='get'
      role='search'
      aria-busy={isPending}
      className='flex items-center w-full border border-primary rounded-lg overflow-hidden bg-white'
    >
      <input
        type='search'
        name='q'
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className='w-full flex-1 min-w-0 px-4 py-2 outline-none'
      />
      <button
        type='submit'
        aria-label='Buscar'
        className='px-4 py-2 text-white bg-primary cursor-pointer hover:opacity-80 transition-opacity'
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} aria-hidden='true' />
      </button>
    </form>
  )
}

export default SearchBar
