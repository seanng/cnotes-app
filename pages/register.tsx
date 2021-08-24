import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import Layout from 'components/organisms/Layout'
import { Box, Button, Container, Text } from '@chakra-ui/react'

const SignupMutation = gql`
  mutation SignupMutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`

function RegisterPage(): JSX.Element {
  const [signup] = useMutation(SignupMutation)

  const handleSignup = async e => {
    e.preventDefault()
    try {
      await signup({
        variables: {
          // TODO: replace input
          input: {
            email: 'testabc@gmail.com',
            password: 'helloworld',
            firstName: 'sean',
            lastName: 'sean',
            role: 'CREATOR',
          },
        },
      })
    } catch (error) {
      console.log('error in handleSignup: ', error)
    }
  }

  return (
    <Layout>
      <Container>
        <Box display="none">
          <Button onClick={handleSignup} />
        </Box>
        <Text>this is the register page.</Text>
      </Container>
    </Layout>
  )
}

export default RegisterPage
