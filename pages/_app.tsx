import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from 'providers/chakra'
import type { AppProps } from 'next/app'
import client from 'lib/apollo-client'
import dynamic from 'next/dynamic'
import '@fontsource/dm-sans'
import '@fontsource/poppins'
import '@fontsource/bebas-neue'
import CustomFonts from 'theme/custom-fonts'

const CrispWithNoSSR = dynamic(() => import('components/atoms/Crisp'), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider cookies={pageProps.cookies}>
        <CustomFonts />
        <Component {...pageProps} />
        <CrispWithNoSSR />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
