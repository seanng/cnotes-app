import { GetServerSideProps, NextPage } from 'next'
import {
  Box,
  Button,
  FormControl,
  Container,
  Textarea,
  SimpleGrid,
  chakra as c,
  FormLabel,
  Avatar,
  Flex,
} from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { getUserPayload } from 'utils/auth'
import { getErrorMessage, redirTo, uploadToS3 } from 'utils/helpers'
import { User } from 'shared/types'
import { useRouter } from 'next/router'
import { ALIAS_TAKEN, BRAND, URL_REGEX } from 'shared/constants'
import { useForm } from 'react-hook-form'
import { useState, useRef } from 'react'
import gql from 'graphql-tag'
import FormInput from 'components/atoms/FormInput'
import { useMutation } from '@apollo/client'
import FeedbackModal from 'components/molecules/FeedbackModal'

interface Props {
  user: User
}

type OnSubmitProps = {
  firstName?: string
  lastName?: string
  avatarUrl?: string
  alias: string
  websiteUrl: string
  description: string
}

const UpdateUserMutation = gql`
  mutation UpdateUserMutation($input: UserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

const AccountPage: NextPage<Props> = ({ user }: Props) => {
  const [updateUser] = useMutation(UpdateUserMutation)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    defaultValues: {
      alias: user.alias,
      websiteUrl: user.websiteUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
    },
  })

  const [avatarFile, setAvatarFile] = useState(null)
  const avatarUploadInput = useRef(null)
  const router = useRouter()

  const handleAvatarChange = event => {
    event.preventDefault()
    setAvatarFile(event.target.files[0])
  }

  const handleAvatarUploadClick = (): void => {
    if (avatarUploadInput.current) {
      avatarUploadInput.current.click()
    }
  }

  const handleAvatarCancelClick = (): void => {
    setAvatarFile(null)
  }

  const onSubmit = async (data: OnSubmitProps): Promise<void> => {
    try {
      const input = { ...data }
      if (avatarFile) {
        input.avatarUrl = await uploadToS3(avatarFile, 'avatars', user.id)
      }
      await updateUser({ variables: { input } })
      setIsModalOpen(true)
    } catch (error) {
      if (getErrorMessage(error) === ALIAS_TAKEN) {
        setError('alias', {
          type: 'manual',
          message: `This name has been taken.`,
        })
        return
      }
      // error could come from alias taken.
      setIsSuccess(false)
      setIsModalOpen(true)
      console.log('error: ', error)
    }
  }

  const isBrand = user.role === BRAND

  return (
    <>
      <Layout user={user}>
        <Container py={[16, 20]}>
          <Box as="form" onSubmit={handleSubmit(onSubmit)} w="100%" maxW={500}>
            <c.h3 textStyle="h3" mb={12}>
              Account Settings
            </c.h3>
            <Flex mb={8}>
              <Avatar
                size={'2xl'}
                name="Linus Tech Tips"
                src={
                  (avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : user.avatarUrl) || '/banner-default.jpg'
                }
                mr={6}
              />
              <Flex direction="column" justifyContent="center">
                <Box mb={2} textStyle="body2">
                  Profile Photo
                </Box>
                <Box textStyle="caption2" color="neutrals4" mb={3}>
                  We recommend an image of at least 400 x 400
                </Box>
                <Flex>
                  <Button
                    onClick={handleAvatarUploadClick}
                    size="sm"
                    variant="outline"
                  >
                    Upload
                  </Button>
                  {avatarFile && (
                    <Button
                      onClick={handleAvatarCancelClick}
                      size="sm"
                      variant="outline"
                      color="red"
                      ml={2}
                    >
                      Cancel
                    </Button>
                  )}
                </Flex>
                <input
                  type="file"
                  id="file"
                  ref={avatarUploadInput}
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                  accept="image/*"
                />
              </Flex>
            </Flex>
            <SimpleGrid columns={[1, 2]} spacingX={4}>
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
                mr={[0, 4]}
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
              <FormInput
                name="alias"
                label={isBrand ? 'Company Name' : 'Creator Name'}
                errors={errors}
                inputProps={{
                  placeholder: isBrand ? 'eg. Spotify Ltd.' : 'eg. Grapplr',
                  ...register('alias', {
                    required: true,
                  }),
                }}
              />
              <FormInput
                name="websiteUrl"
                label={
                  isBrand
                    ? 'Website URL (Include HTTPS)'
                    : 'Main URL (Include HTTPS)'
                }
                errors={errors}
                inputProps={{
                  placeholder: isBrand
                    ? 'eg. https://drop.com'
                    : 'eg. https://www.youtube.com/channel/UCfRKvxo',
                  ...register('websiteUrl', {
                    required: true,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Enter a valid website url',
                    },
                  }),
                }}
              />
            </SimpleGrid>
            <FormControl>
              <FormLabel htmlFor="description">
                {isBrand ? 'About Us' : 'Bio'}
              </FormLabel>
              <Textarea
                placeholder={
                  isBrand
                    ? `eg. We're a website that sells figurines and other anime merchandise to fans in Scandinavia!`
                    : `eg. I'm a passionate, easy going creator that loves sharing tech gadgets with my amazing community!`
                }
                mb={10}
                {...register('description')}
              />
            </FormControl>
            <Button
              disabled={(!isDirty && !avatarFile) || isSubmitting}
              type="submit"
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </Box>
        </Container>
      </Layout>
      <FeedbackModal
        header={isSuccess ? 'Success!' : 'Uh oh...'}
        body={
          isSuccess
            ? `You have successfully updated your profile.`
            : `There was a problem updating your profile. Please contact michael@cnotes.co.`
        }
        isOpen={isModalOpen}
        buttonText={isSuccess ? 'Reload' : 'Close'}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        onConfirm={(): void => {
          isSuccess ? router.reload() : setIsModalOpen(false)
        }}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}

export default AccountPage
