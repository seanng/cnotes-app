import textStyles from 'theme/foundations/text-styles'
export default {
  baseStyle: {
    ...textStyles.micro,
    fontFamily: 'body',
    letterSpacing: '0.1px',
    fontWeight: 500,
    color: 'gray.400',
    mb: 3,
    _invalid: {
      color: 'red',
    },
  },
}
