import { Heading } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { getCategories } from '@/lib/api/category'
import { Category } from '@/types/category'

const CategoryPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const id = router.query.id

  console.log(id)

  useEffect(() => {
    const handleGetCategories = async () => {
      if (!loading) {
        if (currentUser) {
          const categoriesRes = await getCategories(Number(id))
          setCategories(categoriesRes.data)
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
