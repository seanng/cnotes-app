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
          borderColor: 'gray.800',
          boxShadow: 'none',
        },
        _invalid: {
          borderColor: 'red',
        },
      },
    },
  },
}
