import { mode } from '@chakra-ui/theme-tools'

export default {
  baseStyle: props => ({
    fontFamily: 'body',
    fontWeight: 600,
    color: mode('black', 'white')(props),
    fontSize: '16px',
    mb: 3,
    _invalid: {
      color: 'red',
    },
    _disabled: {
      opacity: 1,
    },
  }),
}
