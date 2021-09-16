import textStyles from 'theme/foundations/text-styles'
export default {
  baseStyle: {
    ...textStyles.hairline2,
    fontFamily: 'body',
    letterSpacing: '0.1px',
    fontWeight: 'bold',
    color: 'gray.400',
    mb: 3,
    _invalid: {
      color: 'red',
    },
  },
}
