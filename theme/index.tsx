import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import textStyles from './foundations/text-styles'
import colors from './foundations/colors'
import Button from './components/button'
import Container from './components/container'
import FormLabel from './components/form-label'
import Tabs from './components/tabs'
import Table from './components/table'
import Tag from './components/tag'
import Tooltip from './components/tooltip'
import Modal from './components/modal'
import CloseButton from './components/close-button'
import Accordion from './components/accordion'
import Input from './components/input'
import Avatar from './components/avatar'
import { mode } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const fonts = {
  heading: 'Anton',
  body: 'Asap',
  digital: 'Roboto Mono',
}

const components = {
  Button,
  Container,
  FormLabel,
  Input,
  Accordion,
  Tag,
  Table,
  Select: Input,
  Tooltip,
  Tabs,
  CloseButton,
  Avatar,
  Modal,
}

const theme = extendTheme({
  colors,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts,
  breakpoints,
  textStyles,
  components,
  styles: {
    global: props => ({
      body: {
        fontSize: '14px',
        bg: mode('gray.50', 'gray.900')(props),
      },
    }),
  },
})

export default theme
export { colors }
