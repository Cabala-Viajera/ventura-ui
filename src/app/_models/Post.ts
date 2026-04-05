import { TypedObject } from 'sanity'

export interface Post {
  _id: string
  title: string
  description: string
  country: string
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
