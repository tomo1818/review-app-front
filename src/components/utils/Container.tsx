import { css } from '@emotion/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  type?: 'normal' | 'large'
}

export const Container: React.FC<Props> = ({ children, type = 'large' }) => {
  return (
    <div css={wrapper}>
      <div css={type === 'large' ? largeContainer : container}>{children}</div>
    </div>
  )
}

// TODO: padding 上下は変更になるかも
const wrapper = css`
  padding: 40px 50px;
  margin: auto;
  @media screen and (max-width: 750px) {
    padding: 8px 12px;
  }

  > div {
    margin: auto;
    @media screen and (max-width: 750px) {
      max-width: 351px;
    }
  }
`

const largeContainer = css`
  max-width: 1090px;
`

const container = css`
  max-width: 700px;
`
