import { Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { getCategories } from '@/lib/api/category'
import { getGroup } from '@/lib/api/group'
import { Category } from '@/types/category'
import { Group } from '@/types/group'

const CategoryPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [group, setGroup] = useState<Group>()
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const id = router.query.id

  console.log(group)

  useEffect(() => {
    const handleGetCategories = async () => {
      if (!loading) {
        if (currentUser) {
          const groupRes = await getGroup(Number(id))
          const categoriesRes = await getCategories(groupRes.data.id)
          setGroup(groupRes.data)
          setCategories(categoriesRes.data)
          console.log(groupRes.data)
          console.log(categoriesRes.data)
        } else {
          router.push('/signin')
        }
      }
    }

    handleGetCategories()
  }, [currentUser, id, loading, router])
  return (
    <>
      <Heading>カテゴリーページ</Heading>
      {categories.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </>
  )
}

export default CategoryPage
