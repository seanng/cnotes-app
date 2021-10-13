import { mode } from '@chakra-ui/theme-tools'

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
          boxShadow: 'none',
        },
        _invalid: {
          borderColor: 'red',
        },
      },
    },
    new: props => ({
      field: {
        borderRadius: 'sm',
        bgColor: mode('gray.50', 'gray.800')(props),
      },
    }),
    rounded: props => ({
      field: {
        borderRadius: 'lg',
        bgColor: mode('gray.50', 'gray.800')(props),
        _disabled: {
          color: mode('gray.300', 'gray.600')(props),
          bgColor: mode('gray.100', 'gray.900')(props),
        },
      },
    }),
  },
}
