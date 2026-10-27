import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from './page'

vi.mock('@components', async () => ({
  Hero: ({ title }: { title: string }) => <h1>{title}</h1>,
  MainBlogList: () => <div data-testid='main-blog-list' />,
  AboutMe: () => null,
}))

vi.mock('@/app/_components/MainBlogList', () => ({
  MainBlogList: () => <div data-testid='main-blog-list' />,
}))

test('Page renders Hero with correct title', async () => {
  render(await Page())
  expect(screen.getByText('Descubre tu próxima aventura')).toBeDefined()
})
