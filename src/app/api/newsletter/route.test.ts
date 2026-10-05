// @vitest-environment node

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { POST } from './route'

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  list: vi.fn(),
  add: vi.fn(),
}))

vi.mock('resend', () => ({
  Resend: class {
    contacts = { ...mocks, segments: { list: mocks.list, add: mocks.add } }
  },
}))

const contact = {
  id: 'contact-id',
  email: 'reader@example.com',
  unsubscribed: false,
}
const providerError = {
  name: 'application_error',
  message: 'Private provider details',
  statusCode: 500,
}

function request(body: unknown = { email: 'reader@example.com' }) {
  return new Request('http://localhost/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.resetAllMocks()
  vi.stubEnv('RESEND_API_KEY', 'test-key')
  vi.stubEnv('RESEND_SEGMENT_ID', 'segment-id')
  mocks.get.mockResolvedValue({ data: contact, error: null })
  mocks.create.mockResolvedValue({ data: { id: contact.id }, error: null })
  mocks.update.mockResolvedValue({ data: { id: contact.id }, error: null })
  mocks.list.mockResolvedValue({
    data: { data: [{ id: 'segment-id' }], has_more: false },
    error: null,
  })
  mocks.add.mockResolvedValue({ data: { id: contact.id }, error: null })
})

afterEach(() => vi.unstubAllEnvs())

describe('POST /api/newsletter', () => {
  it.each([
    null,
    [],
    {},
    { email: 1 },
    { email: '' },
    { email: 'bad@' },
    { email: 'a b@example.com' },
    { email: `${'a'.repeat(255)}@example.com` },
  ])('rejects invalid input %j without contacting Resend', async body => {
    expect((await POST(request(body))).status).toBe(400)
    expect(mocks.get).not.toHaveBeenCalled()
  })

  it('rejects malformed JSON', async () => {
    const response = await POST(
      new Request('http://localhost/api/newsletter', {
        method: 'POST',
        body: '{',
      })
    )
    expect(response.status).toBe(400)
    expect(mocks.get).not.toHaveBeenCalled()
  })

  it('normalizes email and creates a subscribed contact before assigning its segment', async () => {
    mocks.get.mockResolvedValue({ data: null, error: { statusCode: 404 } })
    const response = await POST(request({ email: ' Reader@Example.COM ' }))
    expect(response.status).toBe(200)
    expect(mocks.get).toHaveBeenCalledWith({ email: 'reader@example.com' })
    expect(mocks.create).toHaveBeenCalledWith({
      email: 'reader@example.com',
      unsubscribed: false,
    })
    expect(mocks.add).toHaveBeenCalledWith({
      contactId: contact.id,
      segmentId: 'segment-id',
    })
  })

  it('accepts repeated submissions without creating contacts or readding membership', async () => {
    expect((await POST(request())).status).toBe(200)
    expect((await POST(request())).status).toBe(200)
    expect(mocks.create).not.toHaveBeenCalled()
    expect(mocks.update).not.toHaveBeenCalled()
    expect(mocks.add).not.toHaveBeenCalled()
  })

  it('checks later segment pages before adding membership', async () => {
    mocks.list.mockResolvedValueOnce({
      data: { data: [{ id: 'other-segment' }], has_more: true },
      error: null,
    })
    expect((await POST(request())).status).toBe(200)
    expect(mocks.list).toHaveBeenLastCalledWith({
      contactId: contact.id,
      limit: 100,
      after: 'other-segment',
    })
    expect(mocks.add).not.toHaveBeenCalled()
  })

  it('adds an existing contact to the newsletter segment', async () => {
    mocks.list.mockResolvedValue({ data: { data: [] }, error: null })
    expect((await POST(request())).status).toBe(200)
    expect(mocks.add).toHaveBeenCalledWith({
      contactId: contact.id,
      segmentId: 'segment-id',
    })
  })

  it('reactivates a previously unsubscribed contact', async () => {
    mocks.get.mockResolvedValue({
      data: { ...contact, unsubscribed: true },
      error: null,
    })
    expect((await POST(request())).status).toBe(200)
    expect(mocks.update).toHaveBeenCalledWith({
      id: contact.id,
      unsubscribed: false,
    })
  })

  it('recovers when another request creates the contact concurrently', async () => {
    mocks.get.mockResolvedValueOnce({ data: null, error: { statusCode: 404 } })
    mocks.create.mockResolvedValue({ data: null, error: providerError })
    expect((await POST(request())).status).toBe(200)
    expect(mocks.get).toHaveBeenCalledTimes(2)
  })

  it.each(['RESEND_API_KEY', 'RESEND_SEGMENT_ID'])(
    'handles missing %s without calling Resend',
    async key => {
      vi.stubEnv(key, '')
      expect((await POST(request())).status).toBe(503)
      expect(mocks.get).not.toHaveBeenCalled()
    }
  )

  it.each(['get', 'create', 'update', 'list', 'add'] as const)(
    'does not report success or expose provider details when %s fails',
    async operation => {
      if (operation === 'create')
        mocks.get.mockResolvedValue({ data: null, error: { statusCode: 404 } })
      if (operation === 'update')
        mocks.get.mockResolvedValue({
          data: { ...contact, unsubscribed: true },
          error: null,
        })
      if (operation === 'add')
        mocks.list.mockResolvedValue({ data: { data: [] }, error: null })
      mocks[operation].mockResolvedValue({ data: null, error: providerError })
      const response = await POST(request())
      expect(response.status).toBe(503)
      expect(await response.json()).toEqual({
        message: 'No pudimos suscribirte. Inténtalo de nuevo.',
      })
    }
  )

  it('handles network exceptions', async () => {
    mocks.get.mockRejectedValue(new Error('Private network details'))
    const response = await POST(request())
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({
      message: 'No pudimos suscribirte. Inténtalo de nuevo.',
    })
  })
})
