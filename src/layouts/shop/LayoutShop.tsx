import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Tag,
  TagLabel,
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
import { Tag as TagType } from '@/types/tag'

type Props = {
  category?: Category
  categories?: Category[]
  tags?: TagType[]
  shops: Shop[]
  setShops: (value: Shop[]) => void
  setCategory?: (value: Category) => void
  tagFilter?: (value: number) => void
  categoryFilter?: (value: number) => void
  filteredTags?: number[]
  filteredCategories?: number[]
}

export const LayoutShop: React.FC<Props> = ({
  category,
  shops,
  setShops,
  setCategory,
  tags,
  categories,
  tagFilter = (value) => console.log(value),
  categoryFilter = (value) => console.log(value),
  filteredTags = [],
  filteredCategories = [],
}) => {
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
    // reset: resetCategoryForm,
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
      if (setCategory) setCategory(res.data)
      onEditClose()
      // resetCategoryForm()
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
          <Link href={`/group`}>グループ一覧</Link>
        </BreadcrumbItem>

        {category ? (
          <>
            <BreadcrumbItem>
              <Link href={`/group/${category.groupId}`}>カテゴリー一覧</Link>
            </BreadcrumbItem>

            <ChevronRightIcon color="gray.500" margin="0px 4px" />

            <BreadcrumbItem>
              <BreadcrumbLink cursor="initial">{category.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          <BreadcrumbItem>
            <BreadcrumbLink cursor="initial">全て</BreadcrumbLink>
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
            <Button
              size={isMobile ? 'sm' : 'md'}
              variant="solid"
              colorScheme="teal"
              onClick={onOpen}
            >
              追加する
            </Button>
            <Button
              size={isMobile ? 'sm' : 'md'}
              variant="solid"
              colorScheme="teal"
              onClick={onEditOpen}
            >
              編集する
            </Button>
          </div>
        )}
      </div>
      <Spacer size={isMobile ? 10 : 20} />
      {categories && tags && (
        <Accordion defaultIndex={[]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  カテゴリーでの絞り込み
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={2} gap={2} display="flex" flexWrap="wrap">
              {categories.map((category) => (
                <Tag
                  size="md"
                  key={category.id}
                  borderRadius="full"
                  variant={
                    filteredCategories.indexOf(category.id) !== -1
                      ? 'solid'
                      : 'outline'
                  }
                  colorScheme="green"
                  cursor="pointer"
                  onClick={() => categoryFilter(category.id)}
                >
                  <TagLabel>{category.name}</TagLabel>
                </Tag>
              ))}
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  タグでの絞り込み
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel py={2} gap={2} display="flex" flexWrap="wrap">
              {tags.map((tag) => (
                <Tag
                  size="md"
                  key={tag.id}
                  borderRadius="full"
                  variant={
                    filteredTags.indexOf(tag.id) !== -1 ? 'solid' : 'outline'
                  }
                  colorScheme="green"
                  cursor="pointer"
                  onClick={() => tagFilter(tag.id)}
                >
                  <TagLabel>{tag.name}</TagLabel>
                </Tag>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
      <Spacer size={isMobile ? 20 : 40} />
      <div css={shopsWrapper} data-view-mobile={isMobile}>
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
            category={shop.category}
            url={shop.url}
            description={shop.description}
            createdAt={shop.createdAt}
            updatedAt={shop.updatedAt}
            isMessageShort={true}
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
  &[data-view-mobile='true'] {
    gap: 10px;
  }

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
