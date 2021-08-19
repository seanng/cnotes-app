import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import theme from 'theme'
import '@fontsource/dm-sans'
import '@fontsource/poppins'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/api',
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
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
