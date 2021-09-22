import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from 'theme'

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            rel="preload"
            href="/fonts/GothamPro/GothamPro.ttf"
            as="font"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/GothamPro/GothamPro-Medium.ttf"
            as="font"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          {/* Make Color mode persist when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
