import textStyles from 'theme/foundations/text-styles'
export default {
  baseStyle: {
    ...textStyles.hairline2,
    fontFamily: 'Inter',
    letterSpacing: '0.1px',
    fontWeight: 'bold',
    color: 'neutrals5',
    mb: 3,
    _invalid: {
      color: 'red',
    },
  },
}
