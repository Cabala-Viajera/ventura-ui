import { Resend } from 'resend'

const failureMessage = 'No pudimos suscribirte. Inténtalo de nuevo.'

export async function POST(request: Request) {
  let email: string

  try {
    const body: unknown = await request.json()
    if (
      typeof body !== 'object' ||
      body === null ||
      !('email' in body) ||
      typeof body.email !== 'string'
    ) {
      return Response.json(
        { message: 'Ingresa un correo electrónico válido.' },
        { status: 400 }
      )
    }

    email = body.email.trim().toLowerCase()
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { message: 'Ingresa un correo electrónico válido.' },
        { status: 400 }
      )
    }
  } catch {
    return Response.json(
      { message: 'Ingresa un correo electrónico válido.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const segmentId = process.env.RESEND_SEGMENT_ID
  if (!apiKey || !segmentId) {
    return Response.json({ message: failureMessage }, { status: 503 })
  }

  try {
    const resend = new Resend(apiKey)
    const existing = await resend.contacts.get({ email })
    if (existing.error && existing.error.statusCode !== 404) {
      throw new Error('Contact lookup failed')
    }

    let contact = existing.data
    if (!contact) {
      const created = await resend.contacts.create({
        email,
        unsubscribed: false,
      })
      if (created.error || !created.data) {
        // Another request may have created the same contact after our lookup.
        const concurrent = await resend.contacts.get({ email })
        if (concurrent.error || !concurrent.data)
          throw new Error('Contact creation failed')
        contact = concurrent.data
      } else {
        const added = await resend.contacts.segments.add({
          contactId: created.data.id,
          segmentId,
        })
        if (added.error) throw new Error('Segment assignment failed')
        return Response.json({ message: '¡Gracias por suscribirte!' })
      }
    }

    if (contact.unsubscribed) {
      const updated = await resend.contacts.update({
        id: contact.id,
        unsubscribed: false,
      })
      if (updated.error) throw new Error('Contact update failed')
    }

    let subscribedToSegment = false
    let after: string | undefined
    do {
      const memberships = await resend.contacts.segments.list({
        contactId: contact.id,
        limit: 100,
        after,
      })
      if (memberships.error || !memberships.data)
        throw new Error('Segment lookup failed')
      subscribedToSegment = memberships.data.data.some(
        segment => segment.id === segmentId
      )
      if (subscribedToSegment || !memberships.data.has_more) break
      const lastId = memberships.data.data.at(-1)?.id
      if (!lastId || lastId === after)
        throw new Error('Invalid segment pagination')
      after = lastId
    } while (after)

    if (!subscribedToSegment) {
      const added = await resend.contacts.segments.add({
        contactId: contact.id,
        segmentId,
      })
      if (added.error) throw new Error('Segment assignment failed')
    }

    return Response.json({ message: '¡Gracias por suscribirte!' })
  } catch {
    return Response.json({ message: failureMessage }, { status: 503 })
  }
}
