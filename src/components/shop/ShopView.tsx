import { css } from '@emotion/react'
import { NextLink } from '../utils/NextLink'
import { Thumbnail } from '../utils/Thumbnail'
import { ShopInformation } from './ShopInformation'
import { useDevice } from '@/hooks/use-device'
import { Category } from '@/types/category'
import { Review } from '@/types/review'
import { Tag } from '@/types/tag'

type Props = {
  id: number
  name: string
  groupId: number
  categoryId: number
  avgScore: number
  tags: Tag[]
  url: string
  done: boolean
  tagString: string
  description: string
  category: Category
  isMessageShort?: boolean
  reviews: Review[]
  visitDay: string
  createdAt: Date
  updatedAt: Date
}

export const ShopView: React.FC<Props> = ({
  id,
  name,
  groupId,
  categoryId,
  tags,
  url,
  description,
  category,
  isMessageShort = false,
}) => {
  const { isMobile } = useDevice()
  return (
    <div css={wrapper} data-view-mobile={isMobile}>
      <NextLink href={`/group/${groupId}/shops/${id}`}>
        <a>
          <Thumbnail
            src="https://user-images.githubusercontent.com/83647745/191964262-7b81904e-66a4-4d44-9a69-bbe741db3146.png"
            width={isMobile ? 100 : 200}
            layout="square"
          />
        </a>
      </NextLink>
      <ShopInformation
        headingSize="md"
        name={name}
        groupId={groupId}
        categoryId={categoryId}
        description={description}
        category={category}
        tags={tags}
        id={id}
        url={url}
        isMessageShort={isMessageShort}
      />
    </div>
  )
}

const wrapper = css`
  &[data-view-mobile='true'] {
    align-items: center;
    gap: 15px;
  }

  display: flex;

  /* flex-wrap: wrap; */
  gap: 30px;
`
