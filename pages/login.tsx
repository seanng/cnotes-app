import gql from 'graphql-tag'
import { chakra as c, Box, Flex, Button } from '@chakra-ui/react'
import { useMutation, useApolloClient } from '@apollo/client'
import Input from 'components/atoms/LoginInput'
import { useForm } from 'react-hook-form'
import {
  EMAIL_REGEX,
  INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from 'shared/constants'
import { getErrorMessage } from 'utils/helpers'

type OnSubmitProps = {
  email: string
  password: string
}

const LoginMutation = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        _id
      }
    }
  }
`

export default function Login(): JSX.Element {
  const client = useApolloClient()
  const [login] = useMutation(LoginMutation)

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      await client.resetStore()
      const {
        data: { login: response },
      } = await login({
        variables: {
          input: data,
        },
      })
      console.log('data: ', response)
    } catch (error) {
      if (getErrorMessage(error) === USER_NOT_FOUND) {
        setError('email', {
          type: 'manual',
          message: 'This email is not registered.',
        })
      }
      if (getErrorMessage(error) === INCORRECT_PASSWORD) {
        setError('password', {
          type: 'manual',
          message: 'Invalid username or password.',
        })
      }
    }
  }

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
        <c.form onSubmit={handleSubmit(onSubmit)} maxW={412} m="auto">
          <Box textStyle="h4" fontFamily="Poppins" mb={12}>
            Sign in to cnotes
          </Box>
          <Input
            name="email"
            errors={errors}
            mb={3}
            inputProps={{
              type: 'email',
              ...register('email', {
                required: true,
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Enter a valid email address',
                },
              }),
            }}
          />
          <Input
            name="password"
            errors={errors}
            mb={3}
            inputProps={{
              type: 'password',
              ...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Password must have at least 6 characters',
                },
              }),
            }}
          />
          <Box textStyle="caption1" fontWeight="bold" my={8}>
            If you made an account before xxxx you will need to create a new
            account.
          </Box>
          <Button
            borderRadius="md"
            type="submit"
            isLoading={isSubmitting}
            fontSize={14}
            isFullWidth
          >
            Sign in
          </Button>
        </c.form>
      </Box>
    </Flex>
  )
}
