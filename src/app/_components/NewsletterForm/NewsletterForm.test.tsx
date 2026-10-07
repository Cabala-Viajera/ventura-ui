import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import NewsletterForm from './NewsletterForm'

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('NewsletterForm', () => {
  it('submits only the email, announces progress, and clears it after success', async () => {
    let resolveRequest!: (response: Response) => void
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>(resolve => {
          resolveRequest = resolve
        })
    )
    vi.stubGlobal('fetch', fetchMock)
    render(<NewsletterForm />)

    expect(screen.getByRole('status').textContent).toBe('')

    const input = screen.getByLabelText(
      'Correo electrónico'
    ) as HTMLInputElement
    const button = screen.getByRole('button', {
      name: 'Suscribirme',
    }) as HTMLButtonElement
    expect(input.type).toBe('email')
    expect(input.required).toBe(true)
    fireEvent.change(input, { target: { value: 'reader@example.com' } })
    fireEvent.click(button)

    expect(fetchMock).toHaveBeenCalledWith('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'reader@example.com' }),
    })
    expect(button.disabled).toBe(true)
    expect(input.disabled).toBe(true)
    expect(screen.getByRole('status').textContent).toContain('procesando')

    resolveRequest(new Response(null, { status: 200 }))
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toContain('¡Gracias')
    )
    expect(input.value).toBe('')
    expect(button.disabled).toBe(false)

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar notificación' }))
    expect(screen.getByRole('status').textContent).toBe('')
    expect(document.activeElement).toBe(button)
  })

  it.each(['http', 'network'])(
    'preserves the email and allows retry after a %s failure',
    async failure => {
      const fetchMock = vi.fn()
      if (failure === 'http')
        fetchMock.mockResolvedValueOnce(new Response(null, { status: 503 }))
      else fetchMock.mockRejectedValueOnce(new Error('Network unavailable'))
      fetchMock.mockResolvedValueOnce(new Response(null, { status: 200 }))
      vi.stubGlobal('fetch', fetchMock)
      render(<NewsletterForm />)

      const input = screen.getByLabelText(
        'Correo electrónico'
      ) as HTMLInputElement
      fireEvent.change(input, { target: { value: 'reader@example.com' } })
      fireEvent.click(screen.getByRole('button', { name: 'Suscribirme' }))
      await waitFor(() =>
        expect(screen.getByRole('status').textContent).toContain(
          'Inténtalo de nuevo'
        )
      )
      expect(input.value).toBe('reader@example.com')

      fireEvent.click(screen.getByRole('button', { name: 'Suscribirme' }))
      await waitFor(() =>
        expect(screen.getByRole('status').textContent).toContain('¡Gracias')
      )
      expect(fetchMock).toHaveBeenCalledTimes(2)
    }
  )
})
