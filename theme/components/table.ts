import { mode } from '@chakra-ui/theme-tools'

export default {
  variants: {
    brandDashboard: props => {
      return {
        table: {
          borderSpacing: '0 5px',
          borderCollapse: 'separate',
        },
        th: {
          fontFamily: 'body',
          color: 'gray.500',
          fontSize: '16px',
          fontWeight: 400,
          textTransform: 'capitalize',
          letterSpacing: 'normal',
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
