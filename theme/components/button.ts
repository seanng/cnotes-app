// https://chakra-ui.com/docs/theming/component-style
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts

export default {
  baseStyle: {
    letterSpacing: '0.02em',
    fontWeight: 'bold',
    fontFamily: 'heading',
  },
  sizes: {
    sm: {
      fontSize: '14px',
      px: 4,
      height: '40px',
      borderRadius: '20px',
    },
    md: {
      fontSize: '16px',
      p: 6,
      borderRadius: '90px',
    },
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'blue',
  },
}
