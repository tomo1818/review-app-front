export type CategoryParams = {
  name: string
  groupId: number
  thumbnail?: File
}

export type Category = {
  id: number
  name: string
  groupId: number
  thumbnail?: {
    url: string
  }
  createdAt: Date
  updatedAt: Date
}
