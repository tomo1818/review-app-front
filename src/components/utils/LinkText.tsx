import { Link } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { NextLink } from './NextLink'

type Props = {
  href: string
  caption: string
  color?: string
} & Omit<JSX.IntrinsicElements['a'], 'href'>

export const LinkText: React.FC<Props> = ({
  href,
  caption,
  color = 'teal',
  ...props
}) => {
  return (
    <div css={wrapper}>
      <NextLink href={href}>
        <Link color={color} {...props}>
          {caption}
        </Link>
      </NextLink>
    </div>
  )
}

const wrapper = css`
  > a {
    display: flex;
    width: fit-content;
    align-items: center;
  }
`
