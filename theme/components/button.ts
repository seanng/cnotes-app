// https://chakra-ui.com/docs/theming/component-style
// https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
import { mode, transparentize } from '@chakra-ui/theme-tools'

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
  },
  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
  green: {
    bg: 'green.400',
    color: 'black',
    hoverBg: 'green.500',
    activeBg: 'green.600',
  },
}

const variantSolid = props => {
  const { colorScheme: c } = props

  if (c === 'gray') {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props)

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    }
  }

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {}

  return {
    bg: bg,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: bg,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
  }
}

const variantGhost = props => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    }
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  return {
    color: mode(`${c}.600`, `${c}.200`)(props),
    bg: mode('rgba(255, 255, 255, 0.5)', 'transparent')(props),
    _hover: {
      bg: mode(`${c}.100`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
  }
}

const variantOutline = props => {
  const { colorScheme: c } = props
  const borderColor = mode(`gray.200`, `gray.700`)(props)
  return {
    border: '1px solid',
    borderColor: c === 'gray' ? borderColor : 'currentColor',
    ...variantGhost(props),
  }
}

const variantUnstyled = {
  bg: 'none',
  color: 'inherit',
  display: 'inline',
  lineHeight: 'inherit',
  boxShadow: 'none',
  m: 0,
  p: 0,
}

export default {
  baseStyle: {
    fontFamily: 'body',
    fontSize: '16px',
    boxShadow: 'lg',
  },
  sizes: {
    sm: {
      px: 5,
      height: '40px',
      borderRadius: '5px',
    },
    md: {
      fontSize: '16px',
      p: 6,
    },
  },
  variants: {
    outline: variantOutline,
    solid: variantSolid,
    unstyled: variantUnstyled,
  },
  defaultProps: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'green',
  },
}
