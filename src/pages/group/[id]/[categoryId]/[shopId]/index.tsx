import { Spinner } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LayoutShopDetail } from '@/layouts/shopDetail/LayoutShopDetail'
import { getCategory } from '@/lib/api/category'
import { getShop } from '@/lib/api/shop'
import { shopAtom } from '@/store/shop-store'
import { userValueSelector } from '@/store/user-store'
import { Shop } from '@/types/shop'

type Props = {
  groupId: string
  categoryId: string
  shopId: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const groupId = params?.id as string
  const categoryId = params?.categoryId as string
  const shopId = params?.shopId as string

  return {
    props: {
      groupId,
      categoryId,
      shopId,
    },
  }
}

const ShopDetailPage: NextPage<Props> = ({ groupId, categoryId, shopId }) => {
  const user = useRecoilValue(userValueSelector)
  const [value, setValue] = useRecoilState(shopAtom(shopId))
  const router = useRouter()

  const setShop = (shop: Shop) => {
    if (value) setValue({ ...value, shop: shop })
  }

  const handleGetShop = useCallback(async () => {
    if (!value) {
      const shopRes = await getShop(Number(shopId))
      const { shop, avgScore } = shopRes.data
      console.log(avgScore)
      const categoryRes = await getCategory(shop.id)
      setValue({ category: categoryRes.data, shop: shop })
    }
  }, [shopId, setValue, value])

  useEffect(() => {
    if (user) {
      handleGetShop()
    } else {
      router.push('/signin')
    }
  }, [handleGetShop, router, user])

  return (
    <>
      {!value ? (
        <Spinner />
      ) : (
        <LayoutShopDetail shop={value.shop} setShop={setShop} />
      )}
    </>
  )
}

export default ShopDetailPage
