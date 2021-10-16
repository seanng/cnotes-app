import dynamic from 'next/dynamic'
// import { useWarningOnExit } from 'hooks'
import { gql, useMutation } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import {
  HStack,
  Box,
  Button,
  useDisclosure,
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
import { getErrorMessage, redirTo, uploadToS3, compress } from 'utils/helpers'
import { ALIAS_TAKEN, CREATOR } from 'shared/constants'
import ProfileSettings from 'components/organisms/ProfileSettings'
import SocialSettings from 'components/organisms/SocialSettings'
import { getUserPayload } from 'utils/auth'

const Portfolio = dynamic(
  () => import('components/organisms/PortfolioSettings'),
  {
    ssr: false,
  }
)

const UPDATE_USER = gql`
  mutation updateUser($input: UserInput!) {
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
  about: '',
  tiktokUrl: '',
  youtubeUrl: '',
  genre: '',
  collabs: [],
  samples: [],
}

// refactor out to helpers for use with profile.. use on getServerSideProps
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
    genre: user.genre,
    websiteUrl: user.websiteUrl,
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.about,
    youtubeUrl: user.youtubeUrl,
    tiktokUrl: user.tiktokUrl,
    facebookUrl: user.facebookUrl,
    instagramUrl: user.instagramUrl,
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
  {
    label: 'social',
    Component: SocialSettings,
  },
]

interface Props {
  user: User
}

const SettingsPage: NextPage<Props> = ({ user }: Props) => {
  const [updateUser] = useMutation(UPDATE_USER)
  const [isSuccess, setIsSuccess] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [avatarFile, setAvatarFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
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

  // Commented out because success modal forces page reload
  // useWarningOnExit(
  //   isDirty,
  //   'You have unsaved changes. Are you sure you want to leave this page?'
  // )

  const onSubmit = async (data: SettingsFormFieldValues): Promise<void> => {
    try {
      setIsSuccess(true)
      const input = R.omit(['collabs', 'samples'], data)
      if (avatarFile) {
        const file = await compress(avatarFile)
        input.avatarUrl = await uploadToS3(file, 'avatars', user.id)
      }
      if (bannerFile) {
        const file = await compress(bannerFile)
        input.bannerUrl = await uploadToS3(file, 'banners', user.id)
      }
      if (user.role === CREATOR) {
        input.portfolio = data.collabs.concat(data.samples)
      }
      await updateUser({ variables: { input } })
      onOpen()
    } catch (error) {
      if (getErrorMessage(error) === ALIAS_TAKEN) {
        setError('alias', {
          type: 'manual',
          message: `This name has been taken.`,
        })
        return
      }
      console.log('error: ', error)
      // error could come from alias taken.
      setIsSuccess(false)
      onOpen()
    }
  }

  const onError = data => {
    const showError = {
      websiteUrl: () => setTabIdx(0),
      genre: () => setTabIdx(0),
      alias: () => setTabIdx(0),
      firstName: () => setTabIdx(0),
      lastName: () => setTabIdx(0),
      collabs: () => setTabIdx(1),
      samples: () => setTabIdx(1),
      youtubeUrl: () => setTabIdx(2),
      tiktokUrl: () => setTabIdx(2),
      instagramUrl: () => setTabIdx(2),
      facebookUrl: () => setTabIdx(2),
    }
    showError[Object.keys(data)[0]]()
  }

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    setAvatarFile(e.target.files[0])
  }

  const handleBannerChange: ChangeEventHandler<HTMLInputElement> = e => {
    e.preventDefault()
    setBannerFile(e.target.files[0])
  }

  const handleAvatarCancelClick = (): void => {
    setAvatarFile(null)
  }

  const handleBannerCancelClick = (): void => {
    setBannerFile(null)
  }

  const handleTabChange = (i: number): void => {
    setTabIdx(i)
  }

  const allProps = {
    avatarFile,
    handleAvatarChange,
    handleAvatarCancelClick,
    bannerFile,
    handleBannerChange,
    handleBannerCancelClick,
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
            <HStack>
              <Button
                disabled={
                  (!isDirty && !avatarFile && !bannerFile) || isSubmitting
                }
                type="submit"
                isLoading={isSubmitting}
                mr={4}
              >
                Save Changes
              </Button>
              <a
                href={`/profile/${user.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" variant="outline" size="md">
                  Preview
                </Button>
              </a>
            </HStack>
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
        isOpen={isOpen}
        button={isSuccess ? 'Okay' : 'Close'}
        onClose={onClose}
        onConfirm={(): void => {
          isSuccess ? router.reload() : onClose()
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
