import { ApolloProvider } from '@apollo/client'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import client from 'lib/apollo-client'
import dynamic from 'next/dynamic'
import theme from 'theme'
import '@fontsource/dm-sans'
import '@fontsource/poppins'

const CrispWithNoSSR = dynamic(() => import('components/atoms/Crisp'), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
          <CrispWithNoSSR />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
