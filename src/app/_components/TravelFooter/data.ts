import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { SOCIAL_LINKS } from '@/app/_utils/constants'

export interface TravelFooterSection {
  title: string
  links: { label: string; href: string }[]
}

export interface TravelFooterSocial {
  label: string
  icon: IconDefinition
  href: string
}

const articles = (query: string) => `/articulos?q=${encodeURIComponent(query)}`

// Destination and advice links use the existing article search. Update the
// remaining URLs here when the corresponding editorial pages are published.
export const FOOTER_SECTIONS: TravelFooterSection[] = [
  {
    title: 'Destinos',
    links: [
      ...['Europa', 'América Latina', 'Asia', 'Estados Unidos', 'Oceanía'].map(
        label => ({ label, href: articles(label) })
      ),
      { label: 'Todos los destinos →', href: '/articulos' },
    ],
  },
  {
    title: 'Consejos',
    links: [
      'Tips de viaje',
      'Qué llevar',
      'Presupuesto viajero',
      'Itinerarios',
      'Seguro de viaje',
      'Recursos útiles',
    ].map(label => ({ label, href: articles(label) })),
  },
  {
    title: 'Sobre nosotros',
    links: [
      { label: 'Nuestra historia', href: '/sobre-nosotros' },
      { label: 'Nuestro equipo', href: '/sobre-nosotros/equipo' },
      { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
      { label: 'Colaboraciones', href: '/colaboraciones' },
      { label: 'Prensa', href: '/prensa' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'Escríbenos', href: '/contacto' },
      { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
      { label: 'Propón un destino', href: '/contacto?asunto=destino' },
      { label: 'Publicidad', href: '/contacto?asunto=publicidad' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de privacidad', href: '/privacidad' },
      { label: 'Términos de uso', href: '/terminos' },
      { label: 'Política de cookies', href: '/cookies' },
      { label: 'Aviso legal', href: '/aviso-legal' },
    ],
  },
]

// Reuse known brand profiles; platform homepages are explicit fallbacks until
// the other brand profiles are supplied. All URLs can be overridden via props.
export const FOOTER_SOCIALS: TravelFooterSocial[] = [
  {
    label: 'Instagram',
    icon: faInstagram,
    href: 'https://www.instagram.com/cabalaviajera',
  },
  /* { label: 'Facebook', icon: faFacebookF, href: 'https://www.facebook.com/' },
  { label: 'X', icon: faXTwitter, href: 'https://x.com/' },
  { label: 'TikTok', icon: faTiktok, href: 'https://www.tiktok.com/' },
  { label: 'YouTube', icon: faYoutube, href: 'https://www.youtube.com/' }, */
].map(social => ({
  ...social,
  href:
    SOCIAL_LINKS.find(
      link =>
        link.label === social.label ||
        (social.label === 'X' && link.label === 'Twitter')
    )?.url ?? social.href,
}))
