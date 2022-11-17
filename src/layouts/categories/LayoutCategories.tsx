import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  useDisclosure,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { CategoriesView } from '@/components/categories/CategoriesView'
import { CategoryModal } from '@/components/categories/Modal'
import { Container } from '@/components/utils/Container'
import { NextLink } from '@/components/utils/NextLink'
import { Spacer } from '@/components/utils/Spacer'
import { useDevice } from '@/hooks/use-device'
import { createCategory, deleteCategory } from '@/lib/api/category'
import { createCategoryFormData } from '@/lib/functions/category'
import { Category, CategoryParams } from '@/types/category'

type Props = {
  categories: Category[]
  groupId: number
  setCategories: (value: Category[]) => void
}

export const LayoutCategories: React.FC<Props> = ({
  categories,
  groupId,
  setCategories,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryParams>({
    defaultValues: {
      name: '',
      groupId: groupId,
      thumbnail: undefined,
    },
  })
  const { isMobile } = useDevice()

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteCategory(id)
      console.log('delete category', res.data)
      setCategories(categories.filter((category) => category.id !== id))
    } catch (e) {
      console.log(e)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    const submitData = createCategoryFormData(data)
    console.log(data.thumbnail)
    try {
      const res = await createCategory(submitData)
      setCategories([...categories, res.data])
      onClose()
      reset()
    } catch (e) {
      console.log(e)
    }
  })

  return (
    <Container>
      <Breadcrumb
        spacing="4px"
        separator={<ChevronRightIcon color="gray.500" />}
        color={'blackAlpha.900'}
      >
        <BreadcrumbItem>
          <NextLink href={`/group`}>グループ一覧</NextLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink cursor="initial">グループ詳細</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Spacer size={isMobile ? 15 : 30} />
      <div css={headingWrapper} data-view-mobile={isMobile}>
        <Heading size={isMobile ? 'xl' : '2xl'}>カテゴリー一覧</Heading>
        <div css={buttonWrapper}>
          <Link href={`/group/${groupId}/shops`}>
            <Button
              size={isMobile ? 'sm' : 'md'}
              variant="solid"
              colorScheme="teal"
            >
              ショップ一覧へ
            </Button>
          </Link>
          <Button
            size={isMobile ? 'sm' : 'md'}
            variant="solid"
            colorScheme="teal"
            onClick={onOpen}
          >
            追加する
          </Button>
        </div>
      </div>
      <Spacer size={isMobile ? 20 : 40} />
      <CategoriesView categories={categories} handleDelete={handleDelete} />

      <CategoryModal
        handleSubmit={onSubmit}
        isOpen={isOpen}
        onClose={onClose}
        register={register}
        setValue={setValue}
        errors={errors}
      />
    </Container>
  )
}

const headingWrapper = css`
  &[data-view-mobile='true'] {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const buttonWrapper = css`
  display: flex;
  gap: 15px;
`
