import { afterEach, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import ShareButtons from './ShareButtons'

afterEach(cleanup)

const title = 'México & Perú: ¿qué visitar? #Viajes'
const url = 'https://cabalaviajera.com/mexico-peru'

test('X shares the complete title and canonical URL with correct encoding', () => {
  render(<ShareButtons title={title} url={url} />)

  const link = screen.getByRole('link', { name: /^Compartir en X / })
  const destination = new URL(link.getAttribute('href')!)

  expect(destination.origin + destination.pathname).toBe(
    'https://x.com/intent/tweet'
  )
  expect(destination.searchParams.get('text')).toBe(title)
  expect(destination.searchParams.get('url')).toBe(url)
  expect([...destination.searchParams.keys()].sort()).toEqual(['text', 'url'])
})

test('Facebook shares only the supplied URL, preserving nested query parameters', () => {
  const urlWithQuery = `${url}?destino=México&tema=comida#consejos`
  render(<ShareButtons title={title} url={urlWithQuery} />)

  const link = screen.getByRole('link', { name: /^Compartir en Facebook / })
  const destination = new URL(link.getAttribute('href')!)

  expect(destination.origin + destination.pathname).toBe(
    'https://www.facebook.com/sharer/sharer.php'
  )
  expect(destination.searchParams.get('u')).toBe(urlWithQuery)
  expect([...destination.searchParams.keys()]).toEqual(['u'])
})

test('both share links announce a new tab and protect the originating page', () => {
  render(<ShareButtons title={title} url={url} />)

  const links = screen.getAllByRole('link', {
    name: /Compartir en .+ \(se abre en una nueva pestaña\)/,
  })

  expect(links).toHaveLength(2)
  for (const link of links) {
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')?.split(' ')).toEqual(
      expect.arrayContaining(['noopener', 'noreferrer'])
    )
    expect(link.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  }
})
