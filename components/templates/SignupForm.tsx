import { useMutation } from '@apollo/client'
import {
  Box,
  Text,
  chakra as c,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react'
import * as R from 'ramda'
import gql from 'graphql-tag'
import Layout from 'components/organisms/Layout'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX } from 'shared/constants'

type FormInputProps = {
  label: string
  name: string
  errors: Record<string, any>
  inputProps: Record<string, any>
}

type TemplateProps = {
  isBrand?: boolean
}

type OnSubmitProps = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  companyName?: string
}

const SignupMutation = gql`
  mutation SignupMutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`

function FormInput({
  label,
  name,
  errors,
  inputProps,
  ...props
}: FormInputProps): JSX.Element {
  return (
    <FormControl isInvalid={errors[name]} mb={8} {...props}>
      <FormLabel htmlFor="email">{label}</FormLabel>
      <Input id={name} {...inputProps} />
      <FormErrorMessage color="red">
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  )
}

function SignupFormTemplate({ isBrand }: TemplateProps): JSX.Element {
  const [signup] = useMutation(SignupMutation)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    const {
      data: { signup: response },
    } = await signup({
      variables: {
        input: {
          role: isBrand ? 'BRAND' : 'CREATOR',
          ...R.omit(['passwordConfirm'], data),
        },
      },
    })

    // store token in localstorage?

    console.log('response: ', response)
  }

  return (
    <Layout>
      <Container centerContent py={[16, 20]}>
        <Box w={900} maxW="100%">
          <c.h2 textStyle="h2" mb={6}>
            Create Account
          </c.h2>
          <Text color="neutrals4" mb={16}>
            Start getting more transparency into sponsorships.
          </Text>
          <Box w={['90%', '60%']}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                name="firstName"
                label="First Name"
                errors={errors}
                inputProps={{
                  placeholder: 'eg. Steven',
                  ...register('firstName', {
                    required: true,
                  }),
                }}
              />
              <FormInput
                name="lastName"
                label="Last Name"
                errors={errors}
                inputProps={{
                  placeholder: 'eg. Smith',
                  ...register('lastName', {
                    required: true,
                  }),
                }}
              />
              {isBrand && (
                <FormInput
                  name="companyName"
                  label="Company Name"
                  errors={errors}
                  inputProps={{
                    placeholder: 'eg. Spotify Ltd.',
                    ...register('companyName', {
                      required: true,
                    }),
                  }}
                />
              )}
              <FormInput
                name="email"
                label="Email Address"
                errors={errors}
                inputProps={{
                  placeholder: 'eg. Smith',
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
                name="password"
                label="Password"
                errors={errors}
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
                name="passwordConfirm"
                label="Confirm password"
                errors={errors}
                inputProps={{
                  type: 'password',
                  placeholder: 'eg. Smith',
                  ...register('passwordConfirm', {
                    validate: v =>
                      v === password || 'The passwords do not match',
                  }),
                }}
              />
              <Button type="submit" isLoading={isSubmitting}>
                Create Account
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default SignupFormTemplate
