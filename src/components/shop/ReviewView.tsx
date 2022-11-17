import { Box, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { Spacer } from '../utils/Spacer'
import { useDevice } from '@/hooks/use-device'
import { Review } from '@/types/review'

type Props = {
  review: Review
}

export const ReviewView: React.FC<Props> = ({ review }) => {
  const { isMobile } = useDevice()
  return (
    <Box css={reviewWrapper} border="1px solid" borderColor="blackAlpha.400">
      <Box
        css={authorWrapper}
        borderBottom="1px solid"
        borderColor="blackAlpha.200"
      >
        <Text fontSize={isMobile ? 'md' : 'lg'}>{review.author}</Text>
      </Box>
      <Spacer size={isMobile ? 5 : 15} />
      <Text fontSize={isMobile ? 'xs' : 'sm'}>{review.comment}</Text>
      {/* <Spacer size={15} />
      <Box>画像が入る</Box> */}
    </Box>
  )
}

const reviewWrapper = css`
  padding: 15px 20px;
  border-radius: 12px;
`

const authorWrapper = css`
  display: flex;
  padding-bottom: 5px;
`
