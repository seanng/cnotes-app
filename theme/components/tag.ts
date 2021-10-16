export default {
  variants: {
    app: {
      container: {
        borderRadius: 'full',
        fontFamily: 'body',
        fontWeight: 600,
        fontSize: '12px',
        minHeight: '17px',
        textTransform: 'uppercase',
        bgColor: 'yellow.400',
        color: 'black',
        py: '2px',
      },
    },
  },
  defaultProps: {
    // default variant = subtle
    variant: 'app',
  },
}
