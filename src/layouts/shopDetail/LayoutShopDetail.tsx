import { ChevronRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ShopModal } from '@/components/shop/Modal'
import { Reviews } from '@/components/shop/Reviews'
import { ShopInformation } from '@/components/shop/ShopInformation'
import { Container } from '@/components/utils/Container'
import { Spacer } from '@/components/utils/Spacer'
import { useDevice } from '@/hooks/use-device'
import { updateShop } from '@/lib/api/shop'
import { Review } from '@/types/review'
import { Shop, ShopParams } from '@/types/shop'

type Props = {
  shop: Shop
  setShop: (value: Shop) => void
}

export const LayoutShopDetail: React.FC<Props> = ({ shop, setShop }) => {
  const [reviews, setReviews] = useState(shop.reviews)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isMobile } = useDevice()

  const setShopReviews = (review: Review) => {
    const newReviews = [...reviews, review]
    const newShop = { ...shop, reviews: newReviews }
    setReviews(newReviews)
    setShop(newShop)
  }

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    // reset,
    formState: { errors },
  } = useForm<ShopParams>({
    defaultValues: {
      name: shop.name,
      groupId: shop.groupId,
      categoryId: shop.categoryId,
      avgScore: shop.avgScore,
      done: shop.done,
      visitDay: shop.visitDay,
      tagString: shop.tagString,
      url: shop.url,
      description: shop.description,
    },
  })

  const handleEdit = handleSubmit(async (data) => {
    try {
      const res = await updateShop(shop.id, data)
      setShop(res.data)
      onClose()
      // reset()
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

        <BreadcrumbItem>
          <Link href={`/group/${shop.groupId}`}>カテゴリー一覧</Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <Link href={`/group/${shop.groupId}/${shop.categoryId}`}>
            ショップ一覧
          </Link>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink cursor="initial">{shop.name}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Spacer size={isMobile ? 15 : 30} />
      <ShopInformation
        headingSize="2xl"
        name={shop.name}
        groupId={shop.groupId}
        categoryId={shop.categoryId}
        description={shop.description}
        category={shop.category}
        id={shop.id}
        tags={shop.tags}
        url={shop.url}
      />
      <Spacer size={5} />
      <Box justifyContent="flex-end" display="flex">
        <Button
          size={isMobile ? 'sm' : 'md'}
          variant="solid"
          colorScheme="teal"
          onClick={onOpen}
        >
          編集する
        </Button>
      </Box>
      <Spacer size={isMobile ? 15 : 50} />
      <Reviews reviews={reviews} setReviews={setShopReviews} shop={shop} />

      <ShopModal
        onSubmit={handleEdit}
        isOpen={isOpen}
        onClose={onClose}
        register={register}
        setValue={setValue}
        getValues={getValues}
        control={control}
        errors={errors}
        isEdit={true}
      />
    </Container>
  )
}
