import { selector } from 'recoil'
import { v1 } from 'uuid'
import { getCurrentUser } from '@/lib/api/auth'
import { atom } from '@/lib/recoil'
import { User } from '@/types/user'

export const userValue = atom<User | null | undefined>('user-store', undefined)
export const userValueSelector = selector<User | null | undefined>({
  key: `user-store-selector/${v1()}`,
  get: async ({ get }) => {
    const currValue = get(userValue)
    if (!currValue) {
      const res = await getCurrentUser()
      if (res?.data.isLogin) {
        return res?.data.data as User
      } else {
        return null
      }
    }
    return currValue
  },
  set: ({ set }, newValue) => {
    set(userValue, newValue)
  },
})
