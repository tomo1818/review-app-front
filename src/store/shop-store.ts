import { atomFamily } from 'recoil'
import { v1 } from 'uuid'
import { Category } from '@/types/category'
import { Group } from '@/types/group'
import { Shop } from '@/types/shop'

export const groupShopsAtom = atomFamily<
  { group: Group; shops: Shop[] } | null,
  string
>({
  key: `group-shops-family/${v1()}`,
  default: null,
})

export const shopsAtom = atomFamily<
  { category: Category; shops: Shop[] } | null,
  string
>({
  key: `category-shops-family/${v1()}`,
  default: null,
})

export const shopAtom = atomFamily<
  { category: Category; shop: Shop } | null,
  string
>({
  key: `user-shop-family/${v1()}`,
  default: null,
})
