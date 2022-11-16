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
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { CategoryModal } from '@/components/categories/Modal'
import { ShopModal } from '@/components/shop/Modal'
import { ShopView } from '@/components/shop/ShopView'
import { Container } from '@/components/utils/Container'
import { Spacer } from '@/components/utils/Spacer'
import { useDevice } from '@/hooks/use-device'
import { updateCategory } from '@/lib/api/category'
import { createShop } from '@/lib/api/shop'
import { createCategoryFormData } from '@/lib/functions/category'
import { Category, CategoryParams } from '@/types/category'
import { Shop, ShopParams } from '@/types/shop'

type Props = {
  category?: Category
  shops: Shop[]
  setShops: (value: Shop[]) => void
}

export const LayoutShop: React.FC<Props> = ({ category, shops, setShops }) => {
  const router = useRouter()
  const { id, categoryId } = router.query
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm<ShopParams>({
    defaultValues: {
      name: '',
      groupId: Number(id),
      categoryId: Number(categoryId),
      avgScore: 0,
      done: false,
      visitDay: '',
      tagString: '',
      url: '',
      description: '',
    },
  })

  const {
    register: categoryRegister,
    handleSubmit: categoryHandleSubmit,
    setValue: categorySetValue,
    reset: resetCategoryForm,
    formState: { errors: categoryErrors },
  } = useForm<CategoryParams>({
    defaultValues: {
      name: category ? category.name : '',
      groupId: category ? category.groupId : 0,
      thumbnail: undefined,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await createShop(data)
      console.log(res.data)
      setShops([...shops, res.data])
      reset()
      onClose()
    } catch (e) {
      console.log(e)
    }
  })
  const { isMobile } = useDevice()

  const handleEdit = categoryHandleSubmit(async (data) => {
    const formData = createCategoryFormData(data)
    try {
      const res = await updateCategory(category ? category.id : 0, formData)
      console.log(res.data)
      onClose()
      resetCategoryForm()
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

        {category ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href={`/group/${category.groupId}`}>
                カテゴリー一覧
              </BreadcrumbLink>
            </BreadcrumbItem>

            <ChevronRightIcon color="gray.500" margin="0px 4px" />

            <BreadcrumbItem>
              <BreadcrumbLink
                as={Link}
                href={`/group/${category.groupId}/${category.id}`}
              >
                {category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href={`/group/shops`}>
              ショップ一覧
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Spacer size={isMobile ? 15 : 30} />
      <div css={headingWrapper} data-view-mobile={isMobile}>
        <Heading size={isMobile ? 'xl' : '2xl'}>
          {category ? category.name : 'ショップ一覧'}
        </Heading>
        {category && (
          <div css={buttonWrapper}>
            <Button variant="solid" colorScheme="teal" onClick={onOpen}>
              追加する
            </Button>
            <Button variant="solid" colorScheme="teal" onClick={onEditOpen}>
              編集する
            </Button>
          </div>
        )}
      </div>
      <Spacer size={isMobile ? 20 : 40} />
      <div css={shopsWrapper}>
        {shops.map((shop, index) => (
          <ShopView
            key={index}
            id={shop.id}
            name={shop.name}
            groupId={shop.groupId}
            categoryId={shop.categoryId}
            avgScore={shop.avgScore}
            done={shop.done}
            tagString={shop.tagString}
            tags={shop.tags}
            reviews={shop.reviews}
            visitDay={shop.visitDay}
            url={shop.url}
            description={shop.description}
            createdAt={shop.createdAt}
            updatedAt={shop.updatedAt}
          />
        ))}
      </div>

      {category && (
        <>
          <ShopModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            register={register}
            setValue={setValue}
            getValues={getValues}
            control={control}
            errors={errors}
          />
          <CategoryModal
            defaultImage={category.thumbnail?.url}
            handleSubmit={handleEdit}
            isOpen={isEditOpen}
            onClose={onEditClose}
            register={categoryRegister}
            setValue={categorySetValue}
            errors={categoryErrors}
            isEdit={true}
          />
        </>
      )}
    </Container>
  )
}

const shopsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

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
