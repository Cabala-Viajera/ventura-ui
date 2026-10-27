'use client'

import { useTranslations } from 'next-intl'

import { useId, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { NotificationToast, type ToastNotification } from '../NotificationToast'

export default function NewsletterForm() {
  const t = useTranslations()
  const errorMessage = t('newsletterError')
  const id = useId()
  const submitButtonRef = useRef<HTMLButtonElement>(null)
  const [email, setEmail] = useState('')
  const [pending, setPending] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const notification: ToastNotification | null = pending
    ? {
        title: t('wait'),
        message: t('processing'),
        variant: 'loading',
      }
    : status === 'success'
      ? {
          title: t('received'),
          message: t('eligible'),
          variant: 'success',
        }
      : status === 'error'
        ? {
            title: t('wentWrong'),
            message: errorMessage,
            variant: 'error',
          }
        : null

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return

    setPending(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) throw new Error('Subscription failed')

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    } finally {
      setPending(false)
    }
  }

  return (
    <section className='text-foreground' aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`} className='text-lg font-bold leading-7'>
        {t('newsletterTitle')}
      </h2>
      <p
        id={`${id}-description`}
        className='mt-3 text-sm leading-7 text-foreground'
      >
        {t('newsletterDescription')}
      </p>
      <form onSubmit={handleSubmit} className='mt-5' aria-busy={pending}>
        <label htmlFor={`${id}-email`} className='sr-only'>
          {t('email')}
        </label>
        <div className='flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row'>
          <div className='relative min-w-0 flex-1'>
            <FontAwesomeIcon
              icon={faEnvelope}
              aria-hidden='true'
              className='pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-primary'
            />
            <input
              id={`${id}-email`}
              name='email'
              type='email'
              autoComplete='email'
              required
              maxLength={254}
              value={email}
              onChange={event => setEmail(event.target.value)}
              disabled={pending}
              aria-describedby={`${id}-description`}
              placeholder={t('emailPlaceholder')}
              className='min-h-12 w-full min-w-0 rounded-xl bg-white py-3 pr-3 pl-11 text-sm text-foreground placeholder:text-foreground/60 focus-visible:outline-none disabled:opacity-70'
            />
          </div>
          <button
            ref={submitButtonRef}
            type='submit'
            disabled={pending}
            className='min-h-12 shrink-0 cursor-pointer rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none disabled:cursor-wait disabled:opacity-70'
          >
            {pending ? t('subscribing') : t('subscribe')}
            {!pending && (
              <span aria-hidden='true' className='ml-2'>
                →
              </span>
            )}
          </button>
        </div>
      </form>
      <p className='mt-3 text-xs leading-6 text-foreground'>
        {t('rejoin')}{' '}
        <a
          href='mailto:admin@cabalaviajera.com'
          className='rounded-sm underline underline-offset-4 hover:text-foreground/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground'
        >
          admin@cabalaviajera.com
        </a>
        .
      </p>
      <NotificationToast
        notification={notification}
        onDismiss={() => {
          setStatus('idle')
          submitButtonRef.current?.focus({ preventScroll: true })
        }}
      />
      <ul
        className='mt-4 flex flex-wrap gap-x-4 gap-y-3 text-xs text-foreground'
        aria-label={t('benefits')}
      >
        {[t('guides'), t('inspiration')].map(benefit => (
          <li key={benefit} className='flex items-center gap-1.5'>
            <FontAwesomeIcon
              icon={faCheck}
              aria-hidden='true'
              className='size-3 text-foreground'
            />
            {benefit}
          </li>
        ))}
      </ul>
    </section>
  )
}
