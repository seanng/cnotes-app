import { useMutation } from '@apollo/client'
import { Box, chakra as c, Container, Button } from '@chakra-ui/react'
import FormInput from 'components/atoms/FormInput'
import FeedbackModal from 'components/molecules/FeedbackModal'
import Layout from 'components/organisms/Layout'
import gql from 'graphql-tag'
import { NextPage } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { EMAIL_REGEX, USER_NOT_FOUND } from 'shared/constants'
import { getErrorMessage } from 'utils/helpers'

type OnSubmitProps = {
  email: string
}
const ForgotPasswordMutation = gql`
  mutation ForgotPasswordMutation($input: String!) {
    forgotPassword(input: $input)
  }
`

const ForgotPasswordPage: NextPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
  const [forgotPassword] = useMutation(ForgotPasswordMutation)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      await forgotPassword({
        variables: {
          input: data.email,
        },
      })
      setIsModalOpen(true)
    } catch (error) {
      if (getErrorMessage(error) === USER_NOT_FOUND) {
        setError('email', {
          type: 'manual',
          message: 'No such email address',
        })
      }
    }
  }

  const onClose = (): void => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Layout>
        <Container py={[16, 20]}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} w={500} maxW="100%">
            <c.h2 textStyle="h2" mb={16}>
              Forgot Password?
            </c.h2>
            <FormInput
              label="Email Address"
              mb={8}
              error={errors.email}
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
            <Button type="submit" isLoading={isSubmitting}>
              Send reset instructions
            </Button>
          </Box>
        </Container>
      </Layout>
      <FeedbackModal
        hasCloseButton
        onClose={onClose}
        isOpen={isModalOpen}
        header="Email Sent!"
        body="Please check your email inbox for password reset instructions."
        buttonText="Got it!"
      />
    </>
  )
}

export default ForgotPasswordPage