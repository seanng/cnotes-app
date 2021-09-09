import dynamic from 'next/dynamic'
import { useMutation } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import {
  Box,
  Button,
  Container,
  chakra as c,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
  Flex,
} from '@chakra-ui/react'
import FeedbackModal from 'components/molecules/FeedbackModal'
import Layout from 'components/organisms/Layout'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SettingsFormFieldValues, User } from 'shared/types'
import { getErrorMessage, redirTo, uploadToS3 } from 'utils/helpers'
import { ALIAS_TAKEN } from 'shared/constants'
import ProfileSettings from 'components/organisms/ProfileSettings'
import { getUserPayload } from 'utils/auth'

const PastWork = dynamic(() => import('components/organisms/PastCollabs'), {
  ssr: false,
})

const UpdateUserMutation = gql`
  mutation UpdateUserMutation($input: UserInput!) {
    updateUser(input: $input) {
      id
    }
  }
`

const defaultValues = {
  alias: '',
  websiteUrl: '',
  firstName: '',
  lastName: '',
  description: '',
  externalCollabs: [],
  otherSamples: [],
}

const getFormData = (user: User): SettingsFormFieldValues => {
  if (!user) return defaultValues

  return {
    ...defaultValues,
    alias: user.alias,
    websiteUrl: user.websiteUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    externalCollabs: user.externalCollabs || [],
    otherSamples: user.otherSamples || [],
  }
}

interface Props {
  user: User
}

const tabs = [
  {
    label: 'profile',
    Component: ProfileSettings,
  },
  {
    label: 'past collabs',
    Component: PastWork,
  },
]

const SettingsPage: NextPage<Props> = ({ user }: Props) => {
  const [updateUser] = useMutation(UpdateUserMutation)
  const [isSuccess, setIsSuccess] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [tabIdx, setTabIdx] = useState<number>(0)
  const router = useRouter()

  const {
    handleSubmit,
    register,
    setError,
    control,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormFieldValues>({
    defaultValues: getFormData(user),
  })

  const onSubmit = async (data: SettingsFormFieldValues): Promise<void> => {
    try {
      const input = { ...data }
      if (avatarFile) {
        input.avatarUrl = await uploadToS3(avatarFile, 'avatars', user.id)
      }
      console.log('submitting: ', input)
      await updateUser({ variables: { input } })
      console.log('submitt success')
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

  const onError = data => {
    const showError = {
      websiteUrl: () => setTabIdx(0),
      alias: () => setTabIdx(0),
      firstName: () => setTabIdx(0),
      lastName: () => setTabIdx(0),
      externalCollabs: () => setTabIdx(1),
    }
    showError[Object.keys(data)[0]]()
  }

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    setAvatarFile(e.target.files[0])
  }

  const handleAvatarCancelClick = (): void => {
    setAvatarFile(null)
  }

  const handleTabChange = (i: number): void => {
    setTabIdx(i)
  }

  const allProps = {
    avatarFile,
    handleAvatarChange,
    handleAvatarCancelClick,
    register,
    control,
    errors,
    user,
  }

  return (
    <>
      <Layout user={user}>
        <Container py={[16, 20]}>
          <Box as="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <c.h3 textStyle="h3" mb={12}>
              Settings
            </c.h3>
            {/* tabs go here */}
            <Tabs
              index={tabIdx}
              variant="pill"
              size="sm"
              onChange={handleTabChange}
              isLazy
              lazyBehavior="keepMounted"
            >
              <Flex justify="space-between" align="center" mb={10}>
                <TabList>
                  {tabs.map(({ label }) => (
                    <Tab id={label} key={label}>
                      {label}
                    </Tab>
                  ))}
                </TabList>
              </Flex>
              <TabPanels>
                {tabs.map(({ label, Component }) => (
                  <TabPanel key={label}>
                    <Component {...allProps} />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
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

export default SettingsPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
