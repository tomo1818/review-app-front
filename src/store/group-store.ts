import { atomFamily, selector } from 'recoil'
import { v1 } from 'uuid'
import { atom } from '@/lib/recoil'
import { Group } from '@/types/group'

export const userGroups = atom<Group[] | undefined>(
  `user-groups/${v1()}`,
  undefined,
)

export const userGroupsSelector = selector<Group[] | undefined>({
  key: `user-groups-selector/${v1()}`,
  get: ({ get }) => {
    return get(userGroups)
  },
  set: ({ set }, newValue) => {
    set(userGroups, newValue)
  },
})

export const groupFamily = atomFamily<Group | null, number>({
  key: `group-family/${v1()}`,
  default: null,
})
