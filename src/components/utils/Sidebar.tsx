import { css } from '@emotion/react'
import { LinkText } from './LinkText'

export const Sidebar: React.FC = () => {
  return (
    <div css={wrapper}>
      <ul css={menuWrapper}>
        <LinkText href="/" caption="メニュー1"></LinkText>
        <LinkText href="/" caption="メニュー2"></LinkText>
      </ul>
    </div>
  )
}

const wrapper = css`
  position: fixed;
  left: 0;
  width: 300px;
  height: calc(100vh);
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 0;
  background-color: #fafafa;
  overflow-x: hidden;
  overflow-y: hidden;
  transition: left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
`
const menuWrapper = css`
  padding-left: 30px;
`
