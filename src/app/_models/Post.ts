import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { TypedObject } from 'sanity'

export interface Post {
  _id: string
  title: string
  description: string
  country?: string
  slug?: { current: string }
  imgUrl?: {
    asset?: {
      url?: string
    }
  }
  thumbnailImgUrl?: {
    asset?: {
      url?: string
    }
  }
  content?: TypedObject[]
}

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
