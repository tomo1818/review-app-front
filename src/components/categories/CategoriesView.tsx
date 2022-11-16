import { DeleteIcon } from '@chakra-ui/icons'
import { IconButton, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { NextLink } from '../utils/NextLink'
import { Spacer } from '../utils/Spacer'
import { Thumbnail } from '../utils/Thumbnail'
import { SAMPLE_IMAGE_PATH } from '@/constant/image'
import { useDevice } from '@/hooks/use-device'
import { Category } from '@/types/category'

type Props = {
  categories: Category[]
  handleDelete: (id: number) => void
}

export const CategoriesView: React.FC<Props> = ({
  categories,
  handleDelete,
}) => {
  const router = useRouter()
  const groupId = router.query.id
  const { isMobile } = useDevice()

  return (
    <div css={wrapper} data-view-mobile={isMobile}>
      {categories.map(({ id, name, thumbnail }, index) => (
        <div key={index}>
          <NextLink key={index} href={`/group/${groupId}/${id}`}>
            <a>
              <Thumbnail
                src={thumbnail ? thumbnail.url : SAMPLE_IMAGE_PATH}
                width={isMobile ? 351 : 300}
                layout="square"
              />
            </a>
          </NextLink>
          <Spacer size={10} />
          <div css={nameWrapper}>
            <Text color="blackAlpha.900" size="md" fontWeight="bold">
              {name}
            </Text>
            <IconButton
              aria-label="カテゴリーを削除"
              icon={<DeleteIcon />}
              onClick={() => handleDelete(id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const wrapper = css`
  &[data-view-mobile='true'] {
    grid-template-columns: 351px;
  }

  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(3, minmax(100px, 300px));
  row-gap: 30px;

  > div:nth-of-type(3n) {
    margin-right: 0;
  }
`

const nameWrapper = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
