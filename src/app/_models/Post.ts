import { TypedObject } from 'sanity'

export interface Post {
  language?: 'es' | 'en'
  translations?: ({
    _id: string
    language: 'es' | 'en'
    slug?: { current: string }
  } | null)[]
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
