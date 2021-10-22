import Head from 'next/head'
import { gql, useQuery } from '@apollo/client'
import { Box, Text, Container } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { PROFILE_BODY_WIDTH } from 'shared/metrics'
import { useEffect, useState } from 'react'
import ProfileBanner from 'components/atoms/ProfileBanner'
import ProfileBox from 'components/organisms/ProfileBox'
import ProfileLoadingSkeleton from 'components/molecules/ProfileLoadingSkeleton'
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
  slug: string
  user: User
}

const ProfilePage: NextPage<Props> = ({ slug, user }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  const { data } = useQuery(PROFILE_BY_SLUG, {
    variables: { slug },
  })

  useEffect(() => {
    setIsLoading(true)
    if (data && data.profileBySlug) {
      setProfile(profileTransformer(data.profileBySlug))
      setIsLoading(false)
    }
  }, [data])

  const metaDesc = `Sponsor, contact or work with ${profile?.alias} (${profile?.genre})`
  return (
    <Layout user={user}>
      <ProfileBanner src={profile?.bannerUrl} isLoading={isLoading} />
      <Container display={{ md: 'flex' }} maxWidth={1280}>
        {isLoading ? (
          <ProfileLoadingSkeleton />
        ) : (
          <>
            <Head>
              <title>{`${profile?.alias} | ${profile?.genre} | sponsored.so profile`}</title>
              <meta name="description" content={metaDesc} />
              <meta property="og:description" content={metaDesc} />
              <meta property="og:image" content={profile?.avatarUrl} />
              <link
                rel="canonical"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile/${profile?.slug}`}
              />
            </Head>
            <ProfileBox profile={profile} withStats />
            <Box
              width={['100%', null, PROFILE_BODY_WIDTH]}
              pl={[0, null, '5%', 20]}
              mt={[7, null, -8]}
            >
              <Text textStyle={['h3', 'h2']} mb={3}>
                About
              </Text>
              <Text textStyle="base">{profile.about || ABOUT_PLACEHOLDER}</Text>
              {profile?.collabs && <ProfileCollabs collabs={profile.collabs} />}
            </Box>
          </>
        )}
      </Container>
      {!isLoading && (
        <Container py={[4, null, 14]}>
          <ProfileReel profile={profile} />
        </Container>
      )}
    </Layout>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  return { props: { user, slug: ctx.params.slug } }
}
