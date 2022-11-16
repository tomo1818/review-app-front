import { css } from '@emotion/react'
import { NextLink } from '../utils/NextLink'
import { Thumbnail } from '../utils/Thumbnail'
import { ShopInformation } from './ShopInformation'
import { useDevice } from '@/hooks/use-device'
import { Shop } from '@/types/shop'

export const ShopView: React.FC<Shop> = ({
  id,
  name,
  groupId,
  categoryId,
  tags,
  url,
  description,
}) => {
  const { isMobile } = useDevice()
  return (
    <div css={wrapper} data-view-mobile={isMobile}>
      <NextLink href={`/group/${groupId}/${categoryId}/${id}`}>
        <a>
          <Thumbnail
            src="https://user-images.githubusercontent.com/83647745/191964262-7b81904e-66a4-4d44-9a69-bbe741db3146.png"
            width={isMobile ? 351 : 200}
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
        tags={tags}
        id={id}
        url={url}
      />
    </div>
  )
}

const wrapper = css`
  &[data-view-mobile='true'] {
    flex-wrap: wrap;
    gap: 15px;
  }

  display: flex;

  /* flex-wrap: wrap; */
  gap: 30px;
`
