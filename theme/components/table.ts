import { mode } from '@chakra-ui/theme-tools'

export default {
  baseStyle: {
    th: {
      fontFamily: 'body',
      color: 'gray.500',
    },
  },
  variants: {
    brandDashboard: props => {
      return {
        table: {
          borderSpacing: '0 5px',
          borderCollapse: 'separate',
        },
        td: {
          bgColor: mode('#ececec', '#1E1E1E')(props),
          mb: 1,
        },
      }
    },
  },
  defaultProps: {
    variant: 'unstyled',
  },
}
