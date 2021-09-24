import {
  chakra,
  Box,
  BoxProps,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/react'

interface Props extends BoxProps {
  name: string
  inputProps: Record<string, any>
  errors: Record<string, any>
}

function LoginInput({
  name,
  inputProps,
  errors,
  ...props
}: Props): JSX.Element {
  return (
    <FormControl isInvalid={errors[name]} mb={8} {...props}>
      <Box position="relative" {...props}>
        <Box
          position="absolute"
          top="32px"
          right="24px"
          left="24px"
          textStyle="nano"
          lineHeight={0}
        >
          {name}
        </Box>
        <div>
          <chakra.input
            name={name}
            w="100%"
            h="80px"
            p="18px 22px 0"
            borderRadius="12px"
            border="2px"
            borderColor={errors[name] ? 'red' : 'transparent'}
            backgroundColor="rgba(228, 228, 228, 0.3)"
            fontWeight={600}
            color="#11142D"
            transition="all .2s"
            outline="none"
            _focus={{
              borderColor: errors[name] ? 'red' : 'blue',
              backgroundColor: 'white',
            }}
            {...inputProps}
          />
        </div>
      </Box>
      <FormErrorMessage color="red">
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

export default LoginInput
