import {
  ChakraProvider as DefaultChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from '@chakra-ui/react'
import theme from 'theme'

export function ChakraProvider({ cookies, children }): JSX.Element {
  const colorModeManager =
    typeof cookies === 'string'
      ? cookieStorageManager(cookies)
      : localStorageManager

  return (
    <DefaultChakraProvider
      colorModeManager={colorModeManager}
      theme={theme}
      resetCSS
    >
      {children}
    </DefaultChakraProvider>
  )
}

// also export a reusable function getServerSideProps
export function getServerSideProps({ req }) {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  }
}
