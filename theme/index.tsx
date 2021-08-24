import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import textStyles from './foundations/text-styles'
import colors from './foundations/colors'
import Button from './components/button'
import Container from './components/container'
import FormLabel from './components/form-label'
import Tabs from './components/tabs'
import Table from './components/table'
import Input from './components/input'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const fonts = { heading: 'DM Sans', body: 'Poppins' }

const components = {
  Button,
  Container,
  FormLabel,
  Input,
  Table,
  Tabs,
}

const theme = extendTheme({
  colors,
  fonts,
  breakpoints,
  textStyles,
  components,
  styles: {
    global: {
      body: {
        fontSize: '14px',
      },
    },
  },
})

export default theme
