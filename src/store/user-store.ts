import { atom } from '@/lib/recoil'

export const userState = atom('user-store', undefined)
export const userGroupState = atom('user-group-store', [])
