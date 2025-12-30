export interface Post {
  _id: string
  title: string
  description: string
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
}
