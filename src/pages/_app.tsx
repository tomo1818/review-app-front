import 'ress'
import { ChakraProvider } from '@chakra-ui/react'
import { css, Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Global styles={globalStyle} />
        <Component {...pageProps} />
      </AuthProvider>
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
    color: var(--color-secondary);

    &:hover,
    &:focus,
    &:active {
      color: var(--color-accent);
      text-decoration: underline;
    }
  }
`
