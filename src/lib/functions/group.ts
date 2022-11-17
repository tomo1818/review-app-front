import { useRecoilState } from 'recoil'
import { groupFamily } from '@/store/group-store'
import { Group } from '@/types/group'

export const setAtomGroups = (groups: Group[]) => {
  groups.forEach((group) => {
    const [value, setValue] = useRecoilState(groupFamily(group.id))
    if (!value) {
      setValue(group)
    }
  })
}
