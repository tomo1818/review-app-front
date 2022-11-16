import { User } from './user'

export type GroupParams = {
  name: string
}

export type Group = {
  id: number
  name: string
  ownerId: number
  users: User[]
  createdAt: Date
  updatedAt: Date
}
