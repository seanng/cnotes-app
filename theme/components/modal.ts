import textStyles from '../foundations/text-styles'
import { mode } from '@chakra-ui/theme-tools'

const newVariant = props => {
  return {
    dialog: {
      borderRadius: 'xl',
      bg: mode('white', 'black')(props),
      borderWidth: mode(0, 1)(props),
      borderColor: 'gray',
    },
    header: {
      textAlign: 'center',
      pt: 7,
      ...textStyles.h4body,
    },
    footer: {
      pb: 8,
    },
  }
}

export default {
  variants: {
    new: newVariant,
  },
}
