import { mode } from '@chakra-ui/theme-tools'

export default {
  baseStyle: {
    tab: {
      _focus: {
        // removes the ugly blue outline on mobile
        // https://github.com/chakra-ui/chakra-ui/issues/708
        // alternative: https://medium.com/@keeganfamouss/accessibility-on-demand-with-chakra-ui-and-focus-visible-19413b1bc6f9
        boxShadow: 'none',
      },
    },
  },
  variants: {
    pill: props => ({
      tab: {
        borderRadius: 'full',
        color: mode('gray.700', 'gray.200')(props),
        textTransform: 'capitalize',
        backgroundColor: 'transparent',
        _selected: {
          color: mode('gray.50', 'gray.900')(props),
          backgroundColor: mode('gray.900', 'gray.50')(props),
        },
      },
    }),
    new: props => ({
      tab: {
        fontWeight: 600,
        fontSize: '18px',
        color: mode('gray.500', 'gray.400')(props),
        borderBottom: '5px solid',
        borderBottomColor: 'transparent',
        paddingBottom: 4,
        outline: 'none',
        _selected: {
          color: mode('gray.900', 'gray.50')(props),
          borderBottomColor: 'green.500',
        },
      },
    }),
  },
}
