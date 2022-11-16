import { Review } from './review'
import { Tag } from './tag'

export type ShopParams = {
  name: string
  groupId: number
  categoryId: number
  avgScore: number
  done: boolean
  visitDay: string
  tagString: string
  url: string
  description: string
}

export type Shop = {
  id: number
  name: string
  groupId: number
  categoryId: number
  avgScore: number
  done: boolean
  visitDay: string
  tagString: string
  tags: Tag[]
  reviews: Review[]
  url: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type ShopResponse = {
  shop: Shop
  avgScore: number
}
