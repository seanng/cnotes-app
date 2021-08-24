export default {
  sizes: {
    md: {
      field: {
        h: 12,
      },
    },
  },
  variants: {
    outline: {
      field: {
        borderWidth: 2,
        borderRadius: 'xl',
        _hover: {
          borderColor: 'inherit',
        },
        _focus: {
          borderColor: 'neutrals4',
        },
        _invalid: {
          borderColor: 'red',
        },
      },
    },
  },
}
