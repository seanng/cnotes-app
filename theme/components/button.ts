// https://chakra-ui.com/docs/theming/component-style
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
import { darken } from '@chakra-ui/theme-tools'

type Dict = Record<string, any>

const DARKEN_AMOUNT = 10

function variantTab(props: Dict): Dict {
  const { isActive } = props
  return {
    color: isActive ? 'white' : 'neutrals4',
    backgroundColor: isActive ? 'neutrals3' : 'transparent',
    textTransform: 'capitalize',
  }
}

function variantSolid(props: Dict): Dict {
  const { bgColor = 'blue', theme } = props
  const hoverBg = darken(bgColor, DARKEN_AMOUNT)(theme)
  return {
    bgColor,
    color: 'white',
    _hover: {
      backgroundColor: hoverBg,
    },
  }
}

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
      px: 6,
      py: 4,
      borderRadius: '90px',
    },
  },
  variants: {
    solid: variantSolid,
    tab: variantTab,
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'primary',
  },
}
