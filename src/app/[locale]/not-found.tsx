import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

export default function NotFound() {
  const t = useTranslations()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
      <Image
        src='/assets/not-found.png'
        alt={t('notFound')}
        width={400}
        height={300}
      />
      <div className='w-[400px] text-center flex flex-col gap-4'>
        <h2 className='text-4xl font-bold'>{t('notFound')}</h2>
        <Link href='/'>
          <p className='text-primary font-bold text-xl underline'>
            {t('backHome')}
          </p>
        </Link>
      </div>
    </div>
  )
}
