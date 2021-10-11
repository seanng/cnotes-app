import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { mode, transparentize } from '@chakra-ui/theme-tools'

const AVATAR_WIDTH = 12 // avatar size="md" is 48px
const DEFAULT_TH_PX = 6 // https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/table.ts#L134

// chakra ui doesn't support some numbers like 18 as a metric variable
const FIRST_PL = `${
  (DEFAULT_TH_PX + AVATAR_WIDTH + CREATOR_AVATAR_TEXT_SPACING) * 4
}px`

export default {
  baseStyle: {
    th: {
      fontFamily: 'body',
      color: 'gray.500',
    },
  },
  variants: {
    brandDashboard2: props => {
      return {
        table: {
          borderSpacing: '0 5px',
          borderCollapse: 'separate',
        },
        td: {
          bgColor: mode('#ececec', '#1E1E1E')(props),
          _last: {
            bgColor: 'transparent',
          },
          mb: 1,
        },
      }
    },
    brandDashboard: props => {
      const darkHoverBg = transparentize(`gray.200`, 0.12)(props.theme)
      return {
        tbody: {
          tr: {
            borderColor: mode('gray.100', 'gray.800')(props),
            textStyle: 'base',
            cursor: 'pointer',
            transform: 'scale(1)',
            borderBottomWidth: 1,
            _hover: mode({ shadow: 'md' }, { bgColor: darkHoverBg })(props),
          },
        },
        th: {
          // v-align creator heading with text
          _first: {
            pl: FIRST_PL,
          },
        },
      }
    },
  },
  defaultProps: {
    variant: 'unstyled',
  },
}
