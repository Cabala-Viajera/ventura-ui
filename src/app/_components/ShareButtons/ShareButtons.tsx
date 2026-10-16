import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faXTwitter } from '@fortawesome/free-brands-svg-icons'

interface ShareButtonsProps {
  title: string
  url: string
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const links = [
    {
      label: 'Compartir en X',
      icon: faXTwitter,
      className: 'border-black bg-black hover:bg-neutral-800',
      href: `https://x.com/intent/tweet?${new URLSearchParams({ text: title, url })}`,
    },
    {
      label: 'Compartir en Facebook',
      icon: faFacebookF,
      className: 'border-[#0866ff] bg-[#0866ff] hover:bg-[#0756d6]',
      href: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: url })}`,
    },
  ]

  return (
    <div className='mt-4 flex flex-wrap gap-2'>
      {links.map(({ label, icon, href, className }) => (
        <a
          key={label}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${label} (se abre en una nueva pestaña)`}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-bold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground sm:min-h-9 ${className}`}
        >
          <FontAwesomeIcon icon={icon} aria-hidden='true' />
          <span>{label}</span>
        </a>
      ))}
    </div>
  )
}

export default ShareButtons
