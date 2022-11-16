import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { LayoutShop } from '@/layouts/shop/LayoutShop'
import { getAllShops } from '@/lib/api/shop'
import { Shop } from '@/types/shop'

const Shops: NextPage = () => {
  const { loading, currentUser } = useContext(AuthContext)
  const [shops, setShops] = useState<Shop[]>([])
  const router = useRouter()
  const id = router.query.id

  const handleGetAllShops = useCallback(async () => {
    const shopsRes = await getAllShops(Number(id))
    setShops(shopsRes.data)
  }, [id])

  useEffect(() => {
    if (!loading && router.isReady) {
      if (currentUser) {
        handleGetAllShops()
      } else {
        router.push('/signin')
      }
    }
  }, [currentUser, handleGetAllShops, loading, router])

  return <LayoutShop shops={shops} setShops={setShops} />
}

export default Shops
