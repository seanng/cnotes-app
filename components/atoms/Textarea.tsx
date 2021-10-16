import { Textarea, useColorModeValue, TextareaProps } from '@chakra-ui/react'

export default function TextArea(props: TextareaProps): JSX.Element {
  return (
    <Textarea
      borderWidth={0}
      bgColor={useColorModeValue('#ECECEC', 'gray.800')}
      _focus={{ boxShadow: 'none' }}
      {...props}
    />
  )
}
