import { Button, Heading, useDisclosure } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useState } from 'react'
import { Spacer } from '../utils/Spacer'
import { FormModal } from './ReviewModal'
import { ReviewView } from './ReviewView'
import { createReview } from '@/lib/api/review'
import { Review } from '@/types/review'

type Props = {
  reviews: Review[]
  setReviews: (value: Review[]) => void
}

export const Reviews: React.FC<Props> = ({ reviews, setReviews }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [params, setParams] = useState({
    shopId: 1,
    title: '',
    comment: '',
    score: 0,
  })

  const handleChange = (name: string, val: string | number) => {
    setParams({
      ...params,
      [name]: val,
    })
  }

  const handleSubmit = async () => {
    try {
      const res = await createReview(params)
      setReviews([...reviews, res.data])
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Heading size="md" color="blackAlba/900">
        レビュー
      </Heading>
      <Spacer size={20} />
      <div css={reviewsWrapper}>
        {reviews.map((review, index) => (
          <ReviewView review={review} key={index} />
        ))}
      </div>
      <Spacer size={20} />
      <Button variant="solid" colorScheme="teal" onClick={onOpen}>
        レビューを追加する
      </Button>

      <FormModal
        params={params}
        isOpen={isOpen}
        onClose={onClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

const reviewsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 30px;
`
