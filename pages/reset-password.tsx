import { useMutation } from '@apollo/client'
import { Box, Button, chakra as c, Container } from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { NextPage } from 'next'
import { useForm } from 'react-hook-form'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { getErrorMessage } from 'utils/helpers'
import { INVALID_TOKEN } from 'shared/constants'
import FormInput from 'components/atoms/FormInput'
import { useState } from 'react'
import FeedbackModal from 'components/molecules/FeedbackModal'

type OnSubmitProps = {
  password: string
  passwordConfirm: string
}

const ResetPasswordMutation = gql`
  mutation ResetPasswordMutation($input: ResetPasswordInput!) {
    resetPassword(input: $input)
  }
`

const ResetPasswordPage: NextPage = () => {
  const {
    query: { token },
    push: routerPush,
  } = useRouter()
  const [resetPassword] = useMutation(ResetPasswordMutation)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm()
  const password = watch('password')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)

  const onSubmit = async ({ password }: OnSubmitProps): Promise<void> => {
    try {
      await resetPassword({
        variables: {
          input: {
            password,
            token,
          },
        },
      })
      setIsModalOpen(true)
    } catch (error) {
      if (getErrorMessage(error) === INVALID_TOKEN) {
        setIsSuccess(false)
        setIsModalOpen(true)
      }
    }
  }

  const onConfirm = (): void => {
    routerPush(isSuccess ? '/dashboard' : '/forgot-password')
  }

  return (
    <>
      <Layout>
        <Container py={[16, 20]}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} w={600} maxW="100%">
            <c.h2 textStyle="h2" mb={16}>
              Enter your new password
            </c.h2>
            <FormInput
              label="New password"
              error={errors.password}
              inputProps={{
                type: 'password',
                placeholder: 'Your new password',
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
              label="Confirm new password"
              error={errors.passwordConfirm}
              inputProps={{
                type: 'password',
                placeholder: 'Re-enter your new password',
                ...register('passwordConfirm', {
                  validate: v => v === password || 'The passwords do not match',
                }),
              }}
            />
            <Button type="submit" isLoading={isSubmitting}>
              Update password
            </Button>
          </Box>
        </Container>
      </Layout>
      <FeedbackModal
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        isOpen={isModalOpen}
        header={isSuccess ? 'Success!' : 'There was a problem.'}
        body={
          isSuccess
            ? `You have successfully updated your password.`
            : `The reset password link is either invalid or expired. Please reset your password again.`
        }
        buttonText={isSuccess ? 'Go to Dashboard' : 'Go to Password Reset'}
        onConfirm={onConfirm}
      />
    </>
  )
}

export default ResetPasswordPage