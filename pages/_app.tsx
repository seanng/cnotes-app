import Head from 'next/head'
import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from 'providers/chakra'
import type { AppProps } from 'next/app'
import { useApollo } from 'lib/apollo-client'
import dynamic from 'next/dynamic'
import '@fontsource/anton'
import '@fontsource/asap/400.css'
import '@fontsource/asap/500.css'
import '@fontsource/asap/600.css'
import '@fontsource/asap/700.css'
import '@fontsource/roboto-mono/700.css'
import 'styles/slick/slick.css'
import 'styles/slick/slick-theme.css'
import 'animate.css'

const CrispWithNoSSR = dynamic(() => import('components/imports/Crisp'), {
  ssr: false,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const metaDesc = 'Sponsor creators that have the most engaged viewers'
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider cookies={pageProps.cookies}>
        <Head>
          <title>sponsored.so</title>
          <meta name="description" content={metaDesc} />
          <meta property="og:description" content={metaDesc} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>
        <Component {...pageProps} />
        <CrispWithNoSSR />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
