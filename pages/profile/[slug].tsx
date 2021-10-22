import Head from 'next/head'
import { gql } from '@apollo/client'
import { Box, Text, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User, TransformedProfile } from 'shared/types'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import ProfileBanner from 'components/atoms/ProfileBanner'
import ProfileBox from 'components/organisms/ProfileBox'
import { profileTransformer } from 'utils/helpers'

const ProfileReel = dynamic(() => import('components/organisms/ProfileReel'), {
  ssr: false,
})
const ProfileCollabs = dynamic(
  () => import('components/organisms/ProfileCollabs'),
  {
    ssr: false,
  }
)

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
  const metaDesc = `Sponsor, contact or work with ${profile.alias} (${profile.genre})`
  return (
    <Layout user={user}>
      <Head>
        <title>{`${profile.alias} | ${profile.genre} | sponsored.so profile`}</title>
        <meta name="description" content={metaDesc} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:image" content={profile.avatarUrl} />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile.slug}`}
        />
      </Head>
      <ProfileBanner src={profile.bannerUrl} />
      <Container display={{ md: 'flex' }} maxWidth={1280}>
        <ProfileBox profile={profile} withStats />
        <Box
          width={['100%', null, profileBodyWidth]}
          pl={[0, null, '5%', 20]}
          mt={[7, null, -8]}
        >
          <Text textStyle={['h3', 'h2']} mb={3}>
            About
          </Text>
          <Text textStyle="base">{profile.about || ABOUT_PLACEHOLDER}</Text>
          {profile?.collabs && <ProfileCollabs collabs={profile.collabs} />}
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
