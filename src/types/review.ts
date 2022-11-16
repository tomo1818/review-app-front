export type ReviewParams = {
  shopId: number
  title: string
  comment: string
  score: number
}

export type Review = {
  id: number
  shopId: number
  userId: number
  title: string
  author: string
  comment: string
  score: number
  createdAt: Date
  updatedAt: Date
}
