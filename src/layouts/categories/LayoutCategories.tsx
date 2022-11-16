import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { CategoriesView } from '@/components/categories/CategoriesView'
import { CategoryModal } from '@/components/categories/Modal'
import { Container } from '@/components/utils/Container'
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
          <BreadcrumbLink as={Link} href={`/group`}>
            グループ一覧
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink>グループ詳細</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Spacer size={isMobile ? 15 : 30} />
      <div css={headingWrapper}>
        <Heading size={isMobile ? 'xl' : '2xl'}>カテゴリー一覧</Heading>
        <div css={buttonWrapper}>
          <Button variant="solid" colorScheme="teal" onClick={onOpen}>
            追加する
          </Button>
        </div>
      </div>
      <Spacer size={40} />
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const buttonWrapper = css`
  display: flex;
  gap: 15px;
`
