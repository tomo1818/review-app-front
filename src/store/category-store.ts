import { atomFamily } from 'recoil'
import { v1 } from 'uuid'
import { Category } from '@/types/category'

export const categoriesAtom = atomFamily<Category[] | undefined, string>({
  key: `user-categories-family/${v1()}`,
  default: undefined,
})
