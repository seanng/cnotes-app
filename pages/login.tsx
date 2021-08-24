// TODO: add auth
import { Box, Flex } from '@chakra-ui/react'
import Input from 'components/atoms/LoginInput'

export default function Login(): JSX.Element {
  return (
    <Flex minH="100vh">
      <Box
        display={{ base: 'none', lg: 'block' }}
        color="white"
        w="40%"
        px={20}
        py={120}
        bgColor="#6c5dd3"
      >
        <Box textStyle="h1" mb={4}>
          cnotes
        </Box>
        <Box textStyle="body2" fontWeight="bold">
          Making sponsorships more transparent.
        </Box>
      </Box>
      <Box w={{ base: '100%', lg: '60%' }} p={20}>
        <Box as="form" maxW={412} m="auto">
          <Box textStyle="h4" fontFamily="Poppins" mb={12}>
            Sign in to cnotes
          </Box>
          <Input name="email" type="email" mb={3} />
          <Input name="password" type="password" mb={3} />
          <div>
            If you made an account before xxxx you will need to create a new
            account.
          </div>
        </Box>
      </Box>
    </Flex>
  )
}
