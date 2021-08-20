import { CREATOR_AVATAR_TEXT_SPACING } from 'utils/constants'

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
      color: 'neutrals4',
    },
  },
  variants: {
    brandDashboard: {
      tbody: {
        tr: {
          borderColor: 'neutrals6',
          borderBottomWidth: 1,
        },
      },
      th: {
        // v-align creator heading with text
        _first: {
          pl: FIRST_PL,
        },
      },
    },
  },
  defaultProps: {
    variant: 'unstyled',
  },
}
