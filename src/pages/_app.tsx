import 'ress'
import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { Header } from '@/components/layout/Header'
import { AuthProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <AuthProvider>
          <Global styles={globalStyle} />
          <Header />
          <Component {...pageProps} />
        </AuthProvider>
      </RecoilRoot>
    </ChakraProvider>
  )
}

export default MyApp

const globalStyle = css`
  html {
    --color-primary: #3a4452;
    --color-secondary: #bfcbdc;
    --color-base: #f6f7f8;
    --color-accent: #d35692;
    --color-white: #fdfdfd;
    --color-black: #1f1f1f;
  }

  body {
    background-color: var(--color-white);
    color: var(--color-black);
  }

  a {
    /* color: var(--color-secondary); */
    color: rgb(0 0 0 / 92%);
    transition: all 0.2s;

    &:hover,
    &:focus,
    &:active {
      opacity: 0.9;

      /* color: var(--color-accent); */
      text-decoration: none !important;
      transition: all 0.2s;
    }
  }
`
