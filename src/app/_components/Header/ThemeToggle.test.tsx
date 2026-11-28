import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from './ThemeProvider'
import { ThemeToggle } from './ThemeToggle'

const storageKey = 'cabala-theme'
const root = document.documentElement
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  localStorage.clear()
  delete root.dataset.theme
})

function renderToggle() {
  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  )
  return screen.getByRole('button', { name: 'Modo oscuro' })
}

describe('site theme', () => {
  it('keeps a saved override and persists a new choice in plain text', () => {
    localStorage.setItem(storageKey, 'dark')
    const toggle = renderToggle()
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
    expect(root.dataset.theme).toBe('dark')

    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-pressed')).toBe('false')
    expect(root.dataset.theme).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('light')
  })

  it('defaults to light and receives changes from another tab', () => {
    localStorage.setItem(storageKey, 'invalid')
    const toggle = renderToggle()
    expect(toggle.getAttribute('aria-pressed')).toBe('false')
    expect(root.dataset.theme).toBeUndefined()

    localStorage.setItem(storageKey, 'dark')
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: storageKey,
          newValue: 'dark',
          storageArea: localStorage,
        })
      )
    })
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
    expect(root.dataset.theme).toBe('dark')

    localStorage.clear()
    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { storageArea: localStorage })
      )
    })
    expect(toggle.getAttribute('aria-pressed')).toBe('false')
    expect(root.dataset.theme).toBeUndefined()
  })

  it('changes the current page when storage is unavailable', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage blocked', 'SecurityError')
    })

    const toggle = renderToggle()
    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-pressed')).toBe('true')
    expect(root.dataset.theme).toBe('dark')
  })
})
