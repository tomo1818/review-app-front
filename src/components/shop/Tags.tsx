import { Box, Tag } from '@chakra-ui/react'
import { css } from '@emotion/react'
// import { NextLink } from '../utils/NextLink'
import { Tag as TagType } from '@/types/tag'

type Props = {
  tags: TagType[]
  groupId?: number
  categoryId?: number
}

export const Tags: React.FC<Props> = ({ tags, groupId, categoryId }) => {
  return (
    <Box
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
      css={tagsWrapper}
    >
      {tags.map(({ id, name }, index) => (
        // <NextLink href={`/group/${groupId}/${categoryId}?tagId=${id}`} key={index}>
        //   <a>
        //     <Tag size="sm" variant="solid" colorScheme="teal">
        //       {name}
        //     </Tag>
        //   </a>
        // </NextLink>
        <Tag size="sm" variant="solid" colorScheme="teal" key={index}>
          {name}
        </Tag>
      ))}
    </Box>
  )
}

const tagsWrapper = css`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  gap: 5px 10px;
`
