import { Spinner } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { LayoutShopDetail } from '@/layouts/shopDetail/LayoutShopDetail'
import { getShop } from '@/lib/api/shop'
import { Shop } from '@/types/shop'

const ShopDetailPage: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [shop, setShop] = useState<Shop>()
  const [shopLoading, setShopLoading] = useState(true)
  const router = useRouter()
  const { id } = router.query

  const handleGetShop = useCallback(async () => {
    if (currentUser) {
      const shopRes = await getShop(Number(id))
      const { shop, avgScore } = shopRes.data
      console.log(shop)
      console.log(avgScore)
      setShop(shop)
      setShopLoading(false)
    } else {
      router.push('/signin')
    }
  }, [currentUser, id, router])

  useEffect(() => {
    if (router.isReady && !loading) {
      handleGetShop()
    }
  }, [currentUser, handleGetShop, id, loading, router])

  return (
    <div>
      {shopLoading && shop ? (
        <Spinner />
      ) : (
        <>{shop && <LayoutShopDetail shop={shop} setShop={setShop} />}</>
      )}
    </div>
  )
}

export default ShopDetailPage
