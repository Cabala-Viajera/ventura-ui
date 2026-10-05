'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

export type NotificationVariant = 'loading' | 'success' | 'error' | 'info'

export interface ToastNotification {
  variant: NotificationVariant
  title: string
  message: string
}

export interface NotificationToastProps {
  /** Keep the component mounted and pass null when there is no notification. */
  notification: ToastNotification | null
  /** The caller controls dismissal and restores focus when necessary. */
  onDismiss?: () => void
  dismissLabel?: string
}

const variants = {
  loading: {
    icon: faSpinner,
    iconStyle: 'bg-secondary/25 text-foreground',
    borderStyle: 'border-secondary',
  },
  success: {
    icon: faCircleCheck,
    iconStyle: 'bg-emerald-100 text-emerald-800',
    borderStyle: 'border-emerald-600',
  },
  error: {
    icon: faCircleExclamation,
    iconStyle: 'bg-rose-100 text-rose-800',
    borderStyle: 'border-rose-600',
  },
  info: {
    icon: faCircleInfo,
    iconStyle: 'bg-sky-100 text-sky-800',
    borderStyle: 'border-sky-600',
  },
}

export default function NotificationToast({
  notification,
  onDismiss,
  dismissLabel = 'Cerrar notificación',
}: NotificationToastProps) {
  const appearance = notification ? variants[notification.variant] : null
  const loading = notification?.variant === 'loading'

  return (
    <div
      role='status'
      aria-live='polite'
      aria-atomic='true'
      className='fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 sm:right-6 sm:left-auto sm:w-96'
    >
      {notification && appearance && (
        <div
          className={`flex items-start gap-3 rounded-2xl border border-gray-200 border-l-4 ${appearance.borderStyle} bg-white p-4 text-foreground shadow-[0_12px_40px_rgba(0,0,0,0.18)]`}
        >
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${appearance.iconStyle}`}
          >
            <FontAwesomeIcon
              icon={appearance.icon}
              aria-hidden='true'
              className={`size-5 ${loading ? 'animate-spin motion-reduce:animate-none' : ''}`}
            />
          </span>
          <div className='min-w-0 flex-1 pt-0.5'>
            <p className='text-sm font-bold leading-6'>{notification.title}</p>
            <p className='mt-1 text-sm leading-6 text-foreground/75'>
              {notification.message}
            </p>
          </div>
          {!loading && onDismiss && (
            <button
              type='button'
              aria-label={dismissLabel}
              onClick={onDismiss}
              className='-mt-1 -mr-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-gray-100 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none'
            >
              <FontAwesomeIcon
                icon={faXmark}
                aria-hidden='true'
                className='size-4'
              />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
