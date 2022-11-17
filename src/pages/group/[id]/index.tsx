import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { LayoutCategories } from '@/layouts/categories/LayoutCategories'
import { getCategories } from '@/lib/api/category'
import { categoriesAtom } from '@/store/category-store'
import { userValueSelector } from '@/store/user-store'

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

const CategoryPage: NextPage<Props> = ({ groupId }) => {
  const user = useRecoilValue(userValueSelector)
  const [categories, setCategories] = useRecoilState(categoriesAtom(groupId))
  const router = useRouter()

  const handleGetCategories = useCallback(async () => {
    if (!categories) {
      console.log('get category by api')
      const categoriesRes = await getCategories(Number(groupId))
      setCategories(categoriesRes.data)
    }
  }, [categories, groupId, setCategories])

  useEffect(() => {
    if (user) {
      handleGetCategories()
    } else {
      router.push('/signin')
    }
  }, [handleGetCategories, router, user])

  return (
    <>
      {categories && (
        <LayoutCategories
          categories={categories}
          groupId={Number(groupId)}
          setCategories={setCategories}
        />
      )}
    </>
  )
}

export default CategoryPage
