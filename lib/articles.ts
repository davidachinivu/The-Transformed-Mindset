export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  publishDate: string
  featuredImage?: string
  featured?: boolean
}
