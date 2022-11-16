import { Spinner } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { LayoutShop } from '@/layouts/shop/LayoutShop'
import { getCategory } from '@/lib/api/category'
import { getShops } from '@/lib/api/shop'
import { Category } from '@/types/category'
import { Shop } from '@/types/shop'

const CategoryDetailPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [category, setCategory] = useState<Category>()
  const [shops, setShops] = useState<Shop[]>()
  const router = useRouter()
  const { categoryId, tagId } = router.query

  const isTag = useCallback(
    (shop: Shop) => {
      let flag = false
      for (let i = 0; i < shop.tags.length; i++) {
        if (Number(tagId) === shop.tags[i].id) flag = true
      }
      return flag
    },
    [tagId],
  )

  const filterShops = useCallback(
    (shops: Shop[]) => {
      const filteredShops = shops.filter((shop) => isTag(shop))
      return filteredShops
    },
    [isTag],
  )

  useEffect(() => {
    const handleData = async () => {
      const categoryRes = await getCategory(Number(categoryId))
      if (tagId) {
        console.log(tagId)
      }
      setCategory(categoryRes.data)
      const shopsRes = await getShops(Number(categoryRes.data.id))
      setShops(shopsRes.data)
    }

    if (router.isReady && !loading) {
      if (currentUser) {
        handleData()
      } else router.push('/signin')
    }
  }, [categoryId, currentUser, loading, router, tagId])

  return (
    <div>
      {category && shops ? (
        <>
          <LayoutShop
            category={category}
            shops={tagId ? filterShops(shops) : shops}
            setShops={setShops}
          />
        </>
      ) : (
        <>
          <Spinner />
        </>
      )}
    </div>
  )
}

export default CategoryDetailPage
