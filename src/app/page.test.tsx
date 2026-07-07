import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

test('Page renders Hero with correct title', async () => {
  render(await Page())
  expect(screen.getByText('Descubre tu próxima aventura')).toBeDefined()
})
