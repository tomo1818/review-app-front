import { Heading } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { getCategory } from '@/lib/api/category'
import { Category } from '@/types/category'

const CategoryDetailPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [category, setCategory] = useState<Category>()
  const [categoryLoading, setCategoryLoading] = useState(true)
  const router = useRouter()
  const { categoryId } = router.query

  useEffect(() => {
    const handleGetCategory = async () => {
      const categoryRes = await getCategory(Number(categoryId))
      setCategory(categoryRes.data)
      console.log(categoryRes.data)
    }

    if (router.isReady && !loading) {
      if (currentUser) {
        handleGetCategory()
        setCategoryLoading(false)
      } else router.push('/signin')
    }
  }, [categoryId, currentUser, loading, router])

  return (
    <div>
      {categoryLoading ? (
        <Spinner />
      ) : (
        <>
          <Heading>カテゴリ詳細</Heading>
          <p>{category?.name}</p>
        </>
      )}
    </div>
  )
}

export default CategoryDetailPage
