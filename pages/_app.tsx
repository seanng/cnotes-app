import { ApolloProvider } from '@apollo/client'
import { useEffect } from 'react'
import { ChakraProvider } from 'providers/chakra'
import type { AppProps } from 'next/app'
import client from 'lib/apollo-client'
import dynamic from 'next/dynamic'
import AOS from 'aos'
import '@fontsource/anton'
import '@fontsource/asap'
import '@fontsource/poppins'
import '@fontsource/poppins/700.css'
import 'aos/dist/aos.css'
import 'public/temp/landing-temp.css'

const CrispWithNoSSR = dynamic(() => import('components/atoms/Crisp'), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <ApolloProvider client={client}>
      <ChakraProvider cookies={pageProps.cookies}>
        <Component {...pageProps} />
        <CrispWithNoSSR />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
