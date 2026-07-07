import { test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from './Card'

test('Card renders with title and description', () => {
  render(<Card title='Test Card' description='Test Description' />)
  screen.getByText('Test Card')
  screen.getByText('Test Description')
})
