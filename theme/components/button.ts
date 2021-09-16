// https://chakra-ui.com/docs/theming/component-style
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts

type Dict = Record<string, any>

function variantSolid(props: Dict): Dict {
  const { bgColor = 'blue' } = props
  return {
    bgColor,
    color: 'white',
  }
}

function variantOutline(props: Dict): Dict {
  const { color = 'blue' } = props

  return {
    border: '2px solid',
    borderColor: 'gray.100',
    _hover: {
      borderColor: color,
      backgroundColor: 'inherit',
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
      p: 6,
      borderRadius: '90px',
    },
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'primary',
  },
}
