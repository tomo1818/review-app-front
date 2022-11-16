import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { LayoutCategories } from '@/layouts/categories/LayoutCategories'
import { getCategories } from '@/lib/api/category'
import { Category } from '@/types/category'

const CategoryPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [categories, setCategories] = useState<Category[]>([])
  const router = useRouter()
  const id = router.query.id

  const handleGetCategories = useCallback(async () => {
    const categoriesRes = await getCategories(Number(id))
    setCategories(categoriesRes.data)
  }, [id])

  useEffect(() => {
    if (!loading && router.isReady) {
      if (currentUser) {
        handleGetCategories()
      } else {
        router.push('/signin')
      }
    }
  }, [currentUser, handleGetCategories, loading, router])
  return (
    <LayoutCategories
      categories={categories}
      groupId={Number(id)}
      setCategories={setCategories}
    />
  )
}

export default CategoryPage
