import Head from 'next/head'
import { ChakraProvider } from 'providers/chakra'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import Script from 'next/script'
import * as snippet from '@segment/snippet'
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

// segment
Router.events.on('routeChangeComplete', url => {
  // @ts-ignore
  window.analytics.page(url)
})

// This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
const DEFAULT_WRITE_KEY = 'NPsk1GimHq09s7egCUlv7D0tqtUAU5wa'

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || DEFAULT_WRITE_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  }

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'development') {
    return snippet.max(opts)
  }

  return snippet.min(opts)
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const metaTitle = 'Collabski | The Highly Curated Network of Keeb Creators'
  const metaDesc =
    'With Collabski, sponsorships have never been easier! Simply register to access an exclusive network of mechanical keyboard creators looking for sponsorships.'
  return (
    <ChakraProvider cookies={pageProps.cookies}>
      <Head>
        <title>{metaTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content={metaDesc} />
        {/* FACEBOOK / OPEN GRAPH */}
        <meta property="og:description" content={metaDesc} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:url" content="https://collabski.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://d2vh08r8g1sliz.cloudfront.net/assets/og-image.png"
        />
        {/* TWITTER */}
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDesc} />
        <meta property="twitter:domain" content="https://collabski.com" />
        <meta
          property="twitter:image"
          content="https://d2vh08r8g1sliz.cloudfront.net/assets/og-image.png"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      {/* https://github.com/vercel/next.js/blob/canary/examples/with-segment-analytics/pages/_app.js */}
      <Script dangerouslySetInnerHTML={{ __html: renderSnippet() }} />
      <Component {...pageProps} />
      <CrispWithNoSSR />
    </ChakraProvider>
  )
}

export default MyApp
