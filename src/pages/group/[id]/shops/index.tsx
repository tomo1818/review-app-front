import { Spinner } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LayoutShop } from '@/layouts/shop/LayoutShop'
import { getCategories } from '@/lib/api/category'
import { getGroup } from '@/lib/api/group'
import { getAllShops } from '@/lib/api/shop'
import { getTags } from '@/lib/functions/shop'
import { categoriesAtom } from '@/store/category-store'
import { groupShopsAtom } from '@/store/shop-store'
import { userValueSelector } from '@/store/user-store'
import { Shop } from '@/types/shop'
import { Tag } from '@/types/tag'

type Props = {
  groupId: string
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const groupId = params?.id as string

  return {
    props: {
      groupId,
    },
  }
}

const Shops: NextPage<Props> = ({ groupId }) => {
  const user = useRecoilValue(userValueSelector)
  const [value, setValue] = useRecoilState(groupShopsAtom(groupId))
  const [categories, setCategories] = useRecoilState(categoriesAtom(groupId))
  const [tags, setTags] = useState<Tag[]>()
  const [filteredCategories, setFilteredCategories] = useState<number[]>([])
  const [filteredTags, setFilteredTags] = useState<number[]>([])
  const router = useRouter()

  const setShops = (shops: Shop[]) => {
    if (value) setValue({ ...value, shops: shops })
  }

  const tagFilter = (tagId: number) => {
    if (filteredTags.indexOf(tagId) !== -1) {
      setFilteredTags(filteredTags.filter((id) => id !== tagId))
    } else {
      setFilteredTags([...filteredTags, tagId])
    }
  }

  const categoryFilter = (categoryId: number) => {
    if (filteredCategories.indexOf(categoryId) !== -1) {
      setFilteredCategories(
        filteredCategories.filter((id) => id !== categoryId),
      )
    } else {
      setFilteredCategories([...filteredCategories, categoryId])
    }
  }

  const filteredShops = useCallback(() => {
    if (!value) return []
    if (filteredTags.length === 0 && filteredCategories.length === 0) {
      return value.shops
    } else if (filteredTags.length === 0) {
      return value.shops.filter((shop) => {
        let flag = false
        if (filteredCategories.indexOf(shop.categoryId) != -1) flag = true
        return flag
      })
    } else if (filteredCategories.length === 0) {
      return value.shops.filter((shop) => {
        let flag = false
        shop.tags.forEach((tag) => {
          if (filteredTags.indexOf(tag.id) !== -1) flag = true
        })
        return flag
      })
    }
    return value.shops.filter((shop) => {
      let flag = false
      shop.tags.forEach((tag) => {
        if (filteredTags.indexOf(tag.id) !== -1) flag = true
      })
      if (filteredCategories.indexOf(shop.categoryId) != -1) flag = true
      return flag
    })
  }, [filteredCategories, filteredTags, value])

  const handleGetAllShops = useCallback(async () => {
    if (!value) {
      const shopsRes = await getAllShops(Number(groupId))
      const groupRes = await getGroup(Number(groupId))
      setTags(getTags(shopsRes.data))
      setValue({ group: groupRes.data, shops: shopsRes.data })
    } else {
      setTags(getTags(value.shops))
    }
  }, [groupId, setValue, value])

  const handleGetCategories = useCallback(async () => {
    if (!categories) {
      const categoriesRes = await getCategories(Number(groupId))
      setCategories(categoriesRes.data)
    }
  }, [categories, groupId, setCategories])

  useEffect(() => {
    if (user) {
      handleGetAllShops()
      handleGetCategories()
    } else {
      router.push('/signin')
    }
  }, [handleGetAllShops, handleGetCategories, router, user])

  return (
    <>
      {value ? (
        <LayoutShop
          groupId={groupId}
          shops={filteredShops()}
          setShops={setShops}
          tags={tags}
          categories={categories}
          tagFilter={tagFilter}
          categoryFilter={categoryFilter}
          filteredTags={filteredTags}
          filteredCategories={filteredCategories}
        />
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default Shops
