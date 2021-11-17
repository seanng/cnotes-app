import Head from 'next/head'
import { useMutation, gql } from '@apollo/client'
import {
  Box,
  chakra as c,
  Container,
  Button,
  Flex,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react'
import omit from 'ramda/src/omit'
import { useForm } from 'react-hook-form'
import NextLink from 'next/link'
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
import { useColors } from 'hooks'

type TemplateProps = {
  isBrand?: boolean
}

type OnSubmitProps = {
  firstName: string
  lastName: string
  email: string
  websiteUrl?: string
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

const Link = c(NextLink)

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
  const { gray, cyan } = useColors()

  const password = watch('password')

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      console.log('data: ', data)
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
          <Flex mb={6} align="center">
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
              textStyle="h3"
              fontFamily="body"
              textTransform="none"
              fontWeight={700}
            >
              {`Sign up as a ${isBrand ? 'brand' : 'creator'}`}
            </c.h2>
          </Flex>
          <Flex textStyle={['small', 'base']} mb={12}>
            <Box color={gray[600]} mr={3}>
              {`Not a ${isBrand ? 'brand' : 'creator'}?`}
            </Box>
            <Box color={cyan[600]} fontWeight={500}>
              <Link href={isBrand ? '/signup/creator' : '/signup/brand'}>
                {`Go to ${isBrand ? 'creator' : 'brand'} signup form.`}
              </Link>
            </Box>
          </Flex>
          <Box w={['90%', '60%']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <SimpleGrid columns={[1, 2]} spacingX={4}>
                <FormInput
                  label="First name"
                  error={errors.lastName}
                  mb={8}
                  inputProps={{
                    placeholder: 'eg. Steven',
                    ...register('firstName', {
                      required: true,
                    }),
                  }}
                />
                <FormInput
                  label="Last name"
                  error={errors.lastName}
                  mb={8}
                  inputProps={{
                    placeholder: 'eg. Smith',
                    ...register('lastName', {
                      required: true,
                    }),
                  }}
                />
              </SimpleGrid>
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

              {!isBrand && (
                <FormInput
                  label="Main channel URL"
                  error={errors.websiteUrl}
                  mb={8}
                  inputProps={{
                    placeholder: 'eg. https://www.youtube.com/channel/UCfRKvxo',
                    ...register('websiteUrl', {
                      required: true,
                      pattern: {
                        value: URL_REGEX,
                        message: 'Enter a valid website URL (include https://)',
                      },
                    }),
                  }}
                />
              )}
              <SimpleGrid columns={[1, 2]} spacingX={4} mb={5}>
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
              </SimpleGrid>
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
