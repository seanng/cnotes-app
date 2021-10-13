import { gql } from '@apollo/client'
import Image from 'next/image'
import { Box, Center, Flex, Text, Container, Link } from '@chakra-ui/react'
import { useColors } from 'hooks'
import IsVerifiedTag from 'components/atoms/IsVerifiedTag'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User, TransformedProfile } from 'shared/types'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import { format } from 'date-fns'
import ProfileBanner from 'components/atoms/ProfileBanner'
import ProfileBox from 'components/organisms/ProfileBox'
import ProfileReel from 'components/organisms/ProfileReel'
import { profileTransformer } from 'utils/helpers'

const ABOUT_PLACEHOLDER =
  'Thanks for visiting my profile! Here are some of my featured works.'

const PROFILE_BY_SLUG = gql`
  query profileBySlug($slug: String!) {
    profileBySlug(slug: $slug) {
      id
      role
      about
      portfolio
      alias
      slug
      bannerUrl
      avatarUrl
      tiktokUrl
      youtubeUrl
      instagramUrl
      facebookUrl
      genre
      createdAt
      creatorStats
      statsLastVerifiedAt
    }
  }
`

type Props = {
  profile: TransformedProfile
  user: User
}

const ProfilePage: NextPage<Props> = ({ profile, user }: Props) => {
  const profileBodyWidth = `calc(100% - ${PROFILE_BOX_INNER_WIDTH}px - ${PROFILE_BOX_WRAPPER_PADDING}px)`
  const { gray } = useColors()

  return (
    <Layout user={user}>
      <ProfileBanner src={profile.bannerUrl} />
      <Container display={{ md: 'flex' }} maxWidth={1280}>
        <ProfileBox profile={profile} withStats />
        <Box
          width={['100%', null, profileBodyWidth]}
          pl={[0, null, '5%', 20]}
          mt={[7, null, -8]}
        >
          <Text textStyle="h2" mb={3}>
            About
          </Text>
          <Text textStyle="base">{profile.about || ABOUT_PLACEHOLDER}</Text>
          <Text textStyle="h2" mt={10} mb={7}>
            Collabs
          </Text>
          {profile?.collabs.map(collab => (
            <Flex key={collab.platformMediaId} align="center" mb={7}>
              <Center
                borderRadius="full"
                bgColor="black"
                height="50px"
                width="50px"
                minWidth="50px"
                mr={5}
              >
                <Image
                  src={`/logos/${collab.platform}.png`}
                  width="20px"
                  height={collab.platform === 'youtube' ? '15px' : '20px'}
                />
              </Center>
              <Flex direction="column">
                <Box textStyle="base" mb={1} display="inline-block">
                  <Text as="span" fontWeight={600}>
                    <Link href={collab.url}>{collab.deliverable}</Link>
                  </Text>
                  <Text as="span" color={gray[600]}>
                    &nbsp;for&nbsp;
                  </Text>
                  <Text as="span" fontWeight={600} mr={2}>
                    <Link href={collab.companyUrl}>{collab.companyName}</Link>
                  </Text>
                  {collab.isVerified && <IsVerifiedTag />}
                </Box>
                <Text textStyle="small" color={gray[600]}>
                  {collab.publishedAt &&
                    format(new Date(collab.publishedAt), 'dd LLLL yyyy')}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Box>
      </Container>
      <Container py={[4, null, 14]}>
        <ProfileReel profile={profile} />
      </Container>
    </Layout>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    data: { profileBySlug: data },
  } = await client.query({
    query: PROFILE_BY_SLUG,
    variables: { slug: ctx.params.slug },
  })
  const user = getUserPayload(ctx.req.headers.cookie)
  return { props: { profile: profileTransformer(data), user } }
}
