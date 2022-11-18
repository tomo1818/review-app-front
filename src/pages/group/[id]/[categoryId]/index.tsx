import { Spinner } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LayoutShop } from '@/layouts/shop/LayoutShop'
import { getCategory } from '@/lib/api/category'
import { getShops } from '@/lib/api/shop'
import { shopsAtom } from '@/store/shop-store'
import { userValueSelector } from '@/store/user-store'
import { Category } from '@/types/category'
import { Shop } from '@/types/shop'

type Props = {
  groupId: string
  categoryId: string
  tagId?: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const groupId = params?.id as string
  const categoryId = params?.categoryId as string

  return {
    props: {
      groupId,
      categoryId,
      tagId: null,
    },
  }
}

const CategoryDetailPage: NextPage<Props> = ({
  groupId,
  categoryId,
  tagId,
}) => {
  const user = useRecoilValue(userValueSelector)
  const [value, setValue] = useRecoilState(shopsAtom(categoryId))
  const router = useRouter()

  const setShops = (shops: Shop[]) => {
    if (value) setValue({ ...value, shops: shops })
  }

  const setCategory = (category: Category) => {
    if (value) setValue({ ...value, category: category })
  }

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
      if (!value) {
        console.log('get shops by api')
        const categoryRes = await getCategory(Number(categoryId))
        const shopsRes = await getShops(Number(categoryRes.data.id))
        setValue({ category: categoryRes.data, shops: shopsRes.data })
      }
    }
    if (user) {
      handleData()
    } else {
      router.push('/signin')
    }
  }, [categoryId, router, setValue, user, value])

  return (
    <>
      {value ? (
        <LayoutShop
          groupId={groupId}
          category={value.category}
          shops={tagId ? filterShops(value.shops) : value.shops}
          setShops={setShops}
          setCategory={setCategory}
        />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CategoryDetailPage
