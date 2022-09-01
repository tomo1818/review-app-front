import { Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { getUserGroup } from '@/lib/api/user'

const Group: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    const handleGetUserGroup = async () => {
      if (!loading) {
        if (currentUser) {
          const res = await getUserGroup(currentUser.id)
          console.log(res.data)
        } else {
          router.push('/signin')
        }
      }
    }

    handleGetUserGroup()
  }, [currentUser, loading, router])

  return <Heading>グループページ</Heading>
}

export default Group
