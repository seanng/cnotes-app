import Head from 'next/head'
import { ChakraProvider } from 'providers/chakra'
import type { AppProps } from 'next/app'
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
  const metaDesc = 'A curated sponsorship experience'
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <Head>
        <title>Collabski</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={metaDesc} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:title" content="Collabski" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={profile?.avatarUrl} /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
      <CrispWithNoSSR />
    </ChakraProvider>
  )
}

export default MyApp
