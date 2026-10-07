import { afterEach, expect, test } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Pagination from './Pagination'
afterEach(cleanup)

test('Pagination renders nothing for a single page', () => {
  const { container } = render(
    <Pagination currentPage={1} totalPages={1} basePath='/articulos' />
  )
  expect(container.firstChild).toBeNull()
})

test('Pagination marks the current page and links neighbours', () => {
  render(<Pagination currentPage={2} totalPages={3} basePath='/articulos' />)
  expect(screen.getByText('2').getAttribute('aria-current')).toBe('page')
  expect(screen.getByLabelText('Página anterior').getAttribute('href')).toBe(
    '/articulos'
  )
  expect(screen.getByLabelText('Página siguiente').getAttribute('href')).toBe(
    '/articulos?page=3'
  )
})

test('Pagination hides previous on first page and next on last page', () => {
  const { rerender } = render(
    <Pagination currentPage={1} totalPages={3} basePath='/articulos' />
  )
  expect(screen.queryByLabelText('Página anterior')).toBeNull()
  rerender(<Pagination currentPage={3} totalPages={3} basePath='/articulos' />)
  expect(screen.queryByLabelText('Página siguiente')).toBeNull()
})

test('Pagination keeps the search query in page links', () => {
  render(
    <Pagination
      currentPage={1}
      totalPages={3}
      basePath='/articulos'
      query='corea sur'
    />
  )
  expect(screen.getByLabelText('Página siguiente').getAttribute('href')).toBe(
    '/articulos?q=corea+sur&page=2'
  )
})
