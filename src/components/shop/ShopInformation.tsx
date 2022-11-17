import { Heading, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import { BiCategoryAlt } from 'react-icons/bi'
import { LinkText } from '../utils/LinkText'
import { Spacer } from '../utils/Spacer'
import { Tags } from './Tags'
import { useDevice } from '@/hooks/use-device'
import { staticPath } from '@/lib/$path'
import { Category } from '@/types/category'
import { Tag as TagType } from '@/types/tag'

type Props = {
  headingSize: 'md' | '2xl'
  name: string
  groupId: number
  categoryId: number
  description: string
  category: Category
  id: number
  tags: TagType[]
  url: string
  isMessageShort?: boolean
}

export const ShopInformation: React.FC<Props> = ({
  headingSize,
  name,
  groupId,
  categoryId,
  description,
  category,
  id,
  tags,
  url,
  isMessageShort = false,
}) => {
  const { isMobile } = useDevice()

  return (
    <div css={informationWrapper}>
      <div>
        <div css={heading}>
          <Heading size={headingSize} color="blackAlba/900">
            {name}
          </Heading>
          {url && (
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Image
                src={staticPath.svg.icon_launch_svg}
                width={20}
                height={20}
                alt="リンク先へのアイコン"
              />
            </Link>
          )}
        </div>
        <Spacer size={isMobile ? 5 : 10} />
        <Tag size="md" variant="outline" colorScheme="teal">
          <TagLeftIcon boxSize="12px" as={BiCategoryAlt} />
          <TagLabel>{category.name}</TagLabel>
        </Tag>
        <Spacer size={isMobile ? 5 : 10} />
        <Tags tags={tags} groupId={groupId} categoryId={categoryId} />
        <Spacer size={isMobile ? 5 : 10} />
        <Text
          fontSize={isMobile ? 'xs' : 'sm'}
          css={isMessageShort ? short : ''}
        >
          {description}
        </Text>
      </div>
      {headingSize == 'md' && (
        <div>
          <LinkText
            href={`/group/${groupId}/shops/${id}`}
            caption="詳細を見る"
            style={{ marginLeft: 'auto' }}
          />
        </div>
      )}
    </div>
  )
}

const informationWrapper = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`

const heading = css`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    width: 20px;
    height: 20px;
  }
`

const short = css`
  display: box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`
