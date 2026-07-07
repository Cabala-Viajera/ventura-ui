import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface FooterLink {
  label: string
  icon: IconProp
  url: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterProps {
  sections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyrightText?: string
}
