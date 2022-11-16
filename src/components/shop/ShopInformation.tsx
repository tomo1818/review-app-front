import { Heading, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import { LinkText } from '../utils/LinkText'
import { Spacer } from '../utils/Spacer'
import { Tags } from './Tags'
import { useDevice } from '@/hooks/use-device'
import { staticPath } from '@/lib/$path'
import { Tag } from '@/types/tag'

type Props = {
  headingSize: 'md' | '2xl'
  name: string
  groupId: number
  categoryId: number
  description: string
  id: number
  tags: Tag[]
  url: string
}

export const ShopInformation: React.FC<Props> = ({
  headingSize,
  name,
  groupId,
  categoryId,
  description,
  id,
  tags,
  url,
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
            <Link href={url}>
              <a>
                <Image
                  src={staticPath.svg.icon_launch_svg}
                  width={20}
                  height={20}
                  alt="リンク先へのアイコン"
                />
              </a>
            </Link>
          )}
        </div>
        <Spacer size={isMobile ? 5 : 10} />
        <Tags tags={tags} groupId={groupId} categoryId={categoryId} />
        <Spacer size={isMobile ? 5 : 10} />
        <Text size="sm">{description}</Text>
      </div>
      {headingSize == 'md' && (
        <div>
          <LinkText
            href={`/group/${groupId}/${categoryId}/${id}`}
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
