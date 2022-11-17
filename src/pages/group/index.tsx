import { Spinner } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LayoutGroups } from '@/layouts/group/LayoutGroups'
import { getUserGroup } from '@/lib/api/user'
// import { setAtomGroups } from '@/lib/functions/group'
import { userGroupsSelector } from '@/store/group-store'
import { userValueSelector } from '@/store/user-store'
import { User } from '@/types/user'
// import { Group as GroupType } from '@/types/group'

const Group: NextPage = () => {
  const user = useRecoilValue(userValueSelector)
  const [groups, setGroups] = useRecoilState(userGroupsSelector)
  const router = useRouter()

  // const handleSetGroup = (group: GroupType) => {
  //   setGroups([...groups, group])
  // }

  const handleGetUserGroup = useCallback(
    async (user: User) => {
      if (!groups) {
        console.log('get groups by api')
        const res = await getUserGroup(user.id)
        setGroups(res.data)
      }
    },
    [groups, setGroups],
  )

  useEffect(() => {
    if (user) {
      handleGetUserGroup(user)
    } else {
      router.push('/signin')
    }
  }, [handleGetUserGroup, router, setGroups, user])

  return (
    <>
      {groups && user ? (
        <LayoutGroups groups={groups} setGroups={setGroups} user={user} />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Group
