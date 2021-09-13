import dynamic from 'next/dynamic'
import { gql, useMutation } from '@apollo/client'
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
import * as R from 'ramda'
import FeedbackModal from 'components/molecules/FeedbackModal'
import Layout from 'components/organisms/Layout'
import { useRouter } from 'next/router'
import { ChangeEventHandler, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SettingsFormFieldValues, User } from 'shared/types'
import { getErrorMessage, redirTo, uploadToS3 } from 'utils/helpers'
import { ALIAS_TAKEN, CREATOR } from 'shared/constants'
import ProfileSettings from 'components/organisms/ProfileSettings'
import { getUserPayload } from 'utils/auth'

const Portfolio = dynamic(
  () => import('components/organisms/PortfolioSettings'),
  {
    ssr: false,
  }
)

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
  collabs: [],
  samples: [],
}

const getFormData = (user: User): SettingsFormFieldValues => {
  if (!user) return defaultValues

  const collabs = []
  const samples = []

  if (user.portfolio) {
    for (let i = 0; i < user.portfolio.length; i++) {
      const item = user.portfolio[i]
      const list = item.companyName ? collabs : samples
      list.push(item)
    }
  }

  return {
    ...defaultValues,
    alias: user.alias,
    websiteUrl: user.websiteUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    description: user.description,
    collabs,
    samples,
  }
}

const brandTabs = [
  {
    label: 'profile',
    Component: ProfileSettings,
  },
]

const creatorTabs = [
  {
    label: 'profile',
    Component: ProfileSettings,
  },
  {
    label: 'portfolio',
    Component: Portfolio,
  },
]

interface Props {
  user: User
}

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
      setIsSuccess(true)
      const input = R.omit(['collabs', 'samples'], data)
      if (avatarFile) {
        input.avatarUrl = await uploadToS3(avatarFile, 'avatars', user.id)
      }
      if (user.role === CREATOR) {
        input.portfolio = data.collabs.concat(data.samples)
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
    }
  }

  const onError = data => {
    const showError = {
      websiteUrl: () => setTabIdx(0),
      alias: () => setTabIdx(0),
      firstName: () => setTabIdx(0),
      lastName: () => setTabIdx(0),
      collabs: () => setTabIdx(1),
      samples: () => setTabIdx(1),
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

  const tabs = user.role === CREATOR ? creatorTabs : brandTabs

  return (
    <>
      <Layout user={user}>
        <Container py={[16, 20]}>
          <Box as="form" onSubmit={handleSubmit(onSubmit, onError)}>
            <c.h3 textStyle="h3" mb={12}>
              Settings
            </c.h3>
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
                    <Tab id={label} key={label} mr={4}>
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
