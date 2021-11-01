import Head from 'next/head'
import { IconButton, chakra as c, Box, Flex, Button } from '@chakra-ui/react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import Input from 'components/atoms/LoginInput'
import { useForm } from 'react-hook-form'
import {
  EMAIL_REGEX,
  INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from 'shared/constants'
import { getErrorMessage, redirTo } from 'utils/helpers'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { getUserPayload } from 'utils/auth'
import NextLink from 'next/link'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useColors } from 'hooks'
import { withApollo } from 'lib/apollo-client'

const Link = c(NextLink)

type OnSubmitProps = {
  email: string
  password: string
}

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`

const Login: NextPage = () => {
  const client = useApolloClient()
  const [login] = useMutation(LOGIN)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  const { gray, blue } = useColors()

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      await client.resetStore()
      await login({
        variables: {
          input: data,
        },
      })
      router.push('/dashboard')
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
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Flex minH="100vh">
        <Box
          display={{ base: 'none', lg: 'block' }}
          color={gray[0]}
          w="40%"
          px={20}
          py={120}
          bgColor={gray[900]}
        >
          <Box textStyle="h1" mb={4}>
            Collabski
          </Box>
          <Box textStyle="base" fontWeight={500}>
            Making sponsorships more transparent.
          </Box>
        </Box>
        <Box w={{ base: '100%', lg: '60%' }} p={20}>
          <c.form
            onSubmit={handleSubmit(onSubmit)}
            maxW={412}
            m="auto"
            noValidate
          >
            <Flex textStyle="h5" mb={[8, 12]} align="center">
              <IconButton
                size="lg"
                fontSize="24px"
                variant="unstyled"
                colorScheme="gray"
                icon={<ArrowBackIcon />}
                aria-label="back"
                mr={2}
                ml={-4}
                onClick={(): void => {
                  router.back()
                }}
              />
              <span>Sign in</span>
            </Flex>
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
            <Box
              textAlign="right"
              fontWeight={700}
              textStyle="small"
              color={blue[600]}
              mb={6}
            >
              <Link href="/forgot-password">Forgot Password?</Link>
            </Box>
            <Button
              borderRadius="lg"
              type="submit"
              isLoading={isSubmitting}
              fontSize={14}
              isFullWidth
              mb={6}
            >
              Sign in
            </Button>
            <Flex justify="center" textStyle="small" fontWeight={700}>
              <Box mr={4}>Not a member?</Box>
              <Box color={blue[600]}>
                <Link href="/signup">Sign up now</Link>
              </Box>
            </Flex>
          </c.form>
        </Box>
      </Flex>
    </>
  )
}

export default withApollo(Login)

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Automatically navigate user to dashboard if already signed in
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  }
  return { props: {} }
}
