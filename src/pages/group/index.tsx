import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { LayoutGroups } from '@/layouts/group/LayoutGroups'
import { getUserGroup } from '@/lib/api/user'
import { Group } from '@/types/group'

const Group: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const router = useRouter()
  const [groups, setGroups] = useState<Group[]>([])

  const handleGetUserGroup = useCallback(async () => {
    if (currentUser) {
      const res = await getUserGroup(currentUser.id)
      console.log(res.data)
      setGroups(res.data)
    } else {
      router.push('/signin')
    }
  }, [currentUser, router])

  useEffect(() => {
    if (!loading) {
      handleGetUserGroup()
    }
  }, [loading])

  return <LayoutGroups groups={groups} setGroups={setGroups} />
}

export default Group
