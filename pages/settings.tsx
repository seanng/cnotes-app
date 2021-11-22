import omit from 'ramda/src/omit'
import dynamic from 'next/dynamic'
// import { useWarningOnExit } from 'hooks'
import { gql, useQuery, useMutation } from '@apollo/client'
import { GetServerSideProps, NextPage } from 'next'
import {
  HStack,
  Box,
  Button,
  useDisclosure,
  Container,
  Text,
  Tabs,
  TabPanels,
  TabPanel,
  Tab,
  TabList,
  Flex,
} from '@chakra-ui/react'
import FeedbackModal from 'components/molecules/FeedbackModal'
import Layout from 'components/organisms/Layout'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SettingsFormFieldValues, User } from 'shared/types'
import { getErrorMessage, redirTo, uploadToS3 } from 'utils/helpers'
import Compressor from 'compressorjs'
import { ALIAS_TAKEN, CREATOR } from 'shared/constants'
import ProfileSettings from 'components/organisms/ProfileSettings'
import SocialSettings from 'components/organisms/SocialSettings'
import AccountSettings from 'components/organisms/AccountSettings'
import SettingsLoadingSkeleton from 'components/molecules/SettingsLoadingSkeleton'
import { getUserPayload } from 'utils/auth'
import { withApollo } from 'lib/apollo-client'
import AddressSettings from 'components/organisms/AddressSettings'

const Portfolio = dynamic(
  () => import('components/organisms/PortfolioSettings'),
  {
    ssr: false,
  }
)

const SETTINGS_DETAILS = gql`
  fragment SettingsDetails on User {
    id
    alias
    genre
    websiteUrl
    avatarUrl
    bannerUrl
    firstName
    lastName
    about
    youtubeUrl
    tiktokUrl
    twitterUrl
    facebookUrl
    instagramUrl
    address
    portfolio {
      url
      deliverable
      companyName
      companyUrl
    }
  }
`

const ME = gql`
  ${SETTINGS_DETAILS}
  query me {
    me {
      ...SettingsDetails
    }
  }
`

const UPDATE_USER = gql`
  ${SETTINGS_DETAILS}
  mutation updateUser($input: UserInput!) {
    updateUser(input: $input) {
      ...SettingsDetails
    }
  }
`

const brandTabs = [
  {
    label: 'profile',
    Component: ProfileSettings,
  },
  {
    label: 'account',
    Component: AccountSettings,
  },
]

const creatorTabs = [
  {
    label: 'profile',
    Component: ProfileSettings,
  },
  {
    label: 'account',
    Component: AccountSettings,
  },
  {
    label: 'portfolio',
    Component: Portfolio,
  },
  {
    label: 'social',
    Component: SocialSettings,
  },
  {
    label: 'address',
    Component: AddressSettings,
  },
]

const compress = (payload: File): Promise<Blob> =>
  new Promise(
    (resolve, reject) =>
      new Compressor(payload, {
        quality: 0.98,
        convertSize: 500000, // if exceeds 500kb (default was 5mb)
        success: resolve,
        error: reject,
      })
  )

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
  const { data, loading } = useQuery(ME)
  const {
    handleSubmit,
    register,
    setError,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<SettingsFormFieldValues>()

  useEffect(() => {
    if (data?.me) reset(omit(['__typename', 'id'], data.me))
  }, [data])

  // Commented out because success modal forces page reload
  // useWarningOnExit(
  //   isDirty,
  //   'You have unsaved changes. Are you sure you want to leave this page?'
  // )

  const onSubmit = async (data: SettingsFormFieldValues): Promise<void> => {
    const input = { ...data }
    delete input.passwordConfirm
    try {
      setIsSuccess(true)
      const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL
      if (avatarFile) {
        const file = await compress(avatarFile)
        const key = await uploadToS3(file, 'avatars', user.id)
        input.avatarUrl = `${baseUrl}/${key}`
      }
      if (bannerFile) {
        const file = await compress(bannerFile)
        const key = await uploadToS3(file, 'banners', user.id)
        input.bannerUrl = `${baseUrl}/${key}`
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
      password: () => setTabIdx(1),
      passwordConfirm: () => setTabIdx(1),
      portfolio: () => setTabIdx(2),
      youtubeUrl: () => setTabIdx(3),
      tiktokUrl: () => setTabIdx(3),
      instagramUrl: () => setTabIdx(3),
      facebookUrl: () => setTabIdx(3),
      twitterUrl: () => setTabIdx(3),
      address: () => setTabIdx(4),
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
            <Text textStyle="h3body" mb={12}>
              Settings
            </Text>
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
                    {loading ? (
                      <SettingsLoadingSkeleton />
                    ) : (
                      <Component {...allProps} />
                    )}
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
                Save changes
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
            : `There was a problem updating your profile. Please contact michael@collabski.com.`
        }
        isOpen={isOpen}
        button={isSuccess ? 'Okay' : 'Close'}
        onClose={onClose}
        onConfirm={onClose}
      />
    </>
  )
}

export default withApollo(SettingsPage)

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }
  return { props: { user } }
}
