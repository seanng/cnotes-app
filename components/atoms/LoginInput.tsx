import { chakra, Box, BoxProps } from '@chakra-ui/react'

interface Props extends BoxProps {
  name: string
  type: string
}

function LoginInput({ name, type, ...props }: Props): JSX.Element {
  return (
    <Box position="relative" {...props}>
      <Box
        position="absolute"
        top="32px"
        right="24px"
        left="24px"
        textStyle="inputLabel"
      >
        {name}
      </Box>
      <div>
        <chakra.input
          name={name}
          type={type}
          w="100%"
          h="80px"
          p="18px 22px 0"
          borderRadius="12px"
          border="2px"
          borderColor="transparent"
          backgroundColor="rgba(228, 228, 228, 0.3)"
          fontFamily="Inter"
          fontWeight={600}
          color="#11142D"
          transition="all .2s"
          outline="none"
          _focus={{
            borderColor: 'blue',
            backgroundColor: 'white',
          }}
        />
      </div>
    </Box>
  )
}

export default LoginInput
