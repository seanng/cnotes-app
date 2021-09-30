import { mode } from '@chakra-ui/theme-tools'

export default {
  baseStyle: {
    container: {
      borderTopWidth: 0,
      _last: {
        borderBottomWidth: 0,
      },
    },
    button: props => ({
      color: mode('gray.700', 'gray.300')(props),
      _hover: {
        bg: 'transparent',
      },
      pb: 7,
      px: 0,
    }),
    panel: {
      borderTopWidth: '1px',
      px: 0,
      pt: 7,
      pb: 6,
    },
  },
}
