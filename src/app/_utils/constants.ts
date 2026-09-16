import {
  faGithub,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://cabalaviajera.com'

export const SOCIAL_LINKS = [
  {
    label: 'Twitter',
    icon: faXTwitter,
    url: 'https://x.com/claudio_coder',
  },
  {
    label: 'Instagram',
    icon: faInstagram,
    url: 'https://www.instagram.com/cabalaviajera/',
  },
  {
    label: 'GitHub',
    icon: faGithub,
    url: 'https://github.com/Cabala-Viajera',
  },
]
