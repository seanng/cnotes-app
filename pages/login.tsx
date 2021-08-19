// TODO: add auth
import { Box, Container } from '@chakra-ui/react'
import Input from 'components/atoms/Input'

export default function Login(): JSX.Element {
  return (
    <Container>
      <Box position="relative" maxW="412px">
        <Input name="email" label="email" type="email" />
      </Box>
    </Container>
  )
}
