import Head from 'next/head'
import { useMutation, gql } from '@apollo/client'
import {
  Box,
  Text,
  chakra as c,
  Container,
  Button,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import omit from 'ramda/src/omit'
import { useForm } from 'react-hook-form'
import {
  EMAIL_REGEX,
  EMAIL_TAKEN,
  BRAND,
  CREATOR,
  URL_REGEX,
} from 'shared/constants'
import { getErrorMessage } from 'utils/helpers'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import FormInput from 'components/atoms/FormInput'

type TemplateProps = {
  isBrand?: boolean
}

type OnSubmitProps = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  alias: string
}

const SIGN_UP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`

function SignupForm({ isBrand }: TemplateProps): JSX.Element {
  const [signup] = useMutation(SIGN_UP)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
    watch,
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      await signup({
        variables: {
          input: {
            role: isBrand ? BRAND : CREATOR,
            ...omit(['passwordConfirm'], data),
          },
        },
      })
      router.push('/settings')
    } catch (error) {
      if (getErrorMessage(error) === EMAIL_TAKEN) {
        setError('email', {
          type: 'manual',
          message: 'This email address is already registered.',
        })
      }
    }
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Container centerContent py={[16, 20]}>
        <Box w={900} maxW="100%">
          <Flex mb={5} align="center">
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
            <c.h2
              textStyle="h2"
              fontFamily="body"
              textTransform="none"
              fontWeight={700}
            >
              Create account
            </c.h2>
          </Flex>
          <Text color="gray.600" mb={16}>
            Start getting more transparency into sponsorships.
          </Text>
          <Box w={['90%', '60%']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="First name"
                mb={8}
                error={errors.lastName}
                inputProps={{
                  placeholder: 'eg. Steven',
                  ...register('firstName', {
                    required: true,
                  }),
                }}
              />
              <FormInput
                label="Last name"
                mb={8}
                error={errors.lastName}
                inputProps={{
                  placeholder: 'eg. Smith',
                  ...register('lastName', {
                    required: true,
                  }),
                }}
              />
              <FormInput
                label={isBrand ? 'Company name' : 'Creator name'}
                error={errors.alias}
                mb={8}
                inputProps={{
                  placeholder: isBrand ? 'eg. Spotify Ltd.' : 'eg. Grapplr',
                  ...register('alias', {
                    required: true,
                  }),
                }}
              />
              <FormInput
                label={isBrand ? 'Company website URL' : 'Main channel URL'}
                error={errors.websiteUrl}
                mb={8}
                inputProps={{
                  placeholder: isBrand
                    ? 'eg. https://drop.com'
                    : 'eg. https://www.youtube.com/channel/UCfRKvxo',
                  ...register('websiteUrl', {
                    required: true,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Enter a valid website URL (include https://)',
                    },
                  }),
                }}
              />
              <FormInput
                label="Email address"
                error={errors.email}
                mb={8}
                inputProps={{
                  placeholder: 'eg. john@smith.com',
                  ...register('email', {
                    required: true,
                    pattern: {
                      value: EMAIL_REGEX,
                      message: 'Enter a valid email address',
                    },
                  }),
                }}
              />
              <FormInput
                label="Password"
                error={errors.password}
                mb={8}
                inputProps={{
                  type: 'password',
                  placeholder: 'Password',
                  ...register('password', {
                    required: true,
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters',
                    },
                  }),
                }}
              />
              <FormInput
                label="Confirm password"
                error={errors.passwordConfirm}
                mb={8}
                inputProps={{
                  type: 'password',
                  placeholder: 'Re-enter your password',
                  ...register('passwordConfirm', {
                    validate: v =>
                      v === password || 'The passwords do not match',
                  }),
                }}
              />
              <Button type="submit" isLoading={isSubmitting}>
                Create account
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default SignupForm
