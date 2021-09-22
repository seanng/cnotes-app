import { gql } from '@apollo/client'
import { Box, Text, Container } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User, TransformedProfile } from 'shared/types'
import { PLACEHOLDER_BANNER_URL } from 'shared/constants'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import ProfileBox from 'components/organisms/ProfileBox'
import ProfileReel from 'components/organisms/ProfileReel'

const PROFILE_BY_SLUG = gql`
  query profileBySlug($slug: String!) {
    profileBySlug(slug: $slug) {
      id
      description
      portfolio
      alias
      slug
      bannerUrl
      avatarUrl
      createdAt
    }
  }
`

type Props = {
  profile: TransformedProfile
  user: User
}

const ProfilePage: NextPage<Props> = ({ profile, user }: Props) => {
  const bgImage = profile.bannerUrl || PLACEHOLDER_BANNER_URL
  const profileBodyWidth = `calc(100% - ${PROFILE_BOX_INNER_WIDTH}px - ${PROFILE_BOX_WRAPPER_PADDING}px)`

  return (
    <Layout user={user}>
      <Box h={250} w="100%" bgImage={`url(${bgImage})`} bgPosition="cover" />
      <Container display={{ md: 'flex' }}>
        <ProfileBox profile={profile} />
        <Box width={profileBodyWidth} pl={[0, null, 20]}>
          <Text textStyle="h2">About</Text>
          <Text textStyle="base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            facilisis congue a libero neque, bibendum arcu. Integer habitasse
            augue vestibulum nibh a metus nulla. Lectus adipiscing magnis eu
            donec vestibulum. Sit faucibus nisl luctus suscipit gravida.
          </Text>

          {/* <Text>{JSON.stringify(profile)}</Text> */}
        </Box>
      </Container>
      <ProfileReel profile={profile} />
    </Layout>
  )
}

export default ProfilePage

function profileTransformer(data: User): TransformedProfile {
  const portfolio = data.portfolio
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    )

  return {
    ...data,
    portfolio,
    collabs: portfolio.filter(item => !!item.companyName),
  }
}

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
