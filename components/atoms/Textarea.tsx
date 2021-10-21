import {
  forwardRef,
  Textarea,
  useColorModeValue,
  TextareaProps,
} from '@chakra-ui/react'

export default forwardRef<TextareaProps, 'textarea'>((props, ref) => (
  <Textarea
    ref={ref}
    borderWidth={0}
    bgColor={useColorModeValue('#ECECEC', 'gray.800')}
    _focus={{ boxShadow: 'none' }}
    {...props}
  />
))
