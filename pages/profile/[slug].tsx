import { gql } from '@apollo/client'
import { Avatar, Box, Text, Container } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { PortfolioItem, User } from 'shared/types'
import { PLACEHOLDER_BANNER_URL } from 'shared/constants'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'

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

type UserProfile = User & {
  collabs: PortfolioItem[]
}

type TransformedProfile = Omit<UserProfile, 'portfoilo'>

type Props = {
  profile: TransformedProfile
  user: User
}

const ProfilePage: NextPage<Props> = ({ profile, user }: Props) => {
  const bgImage = profile.bannerUrl || PLACEHOLDER_BANNER_URL
  return (
    <Layout user={user}>
      <Box h={250} w="100%" bgImage={`url(${bgImage})`} bgPosition="cover" />
      <Container display={{ md: 'flex' }}>
        <Box
          h={400}
          p={8}
          borderWidth={1}
          borderColor="gray.200"
          mt={-40}
          bgColor="white"
        >
          <Avatar name={profile.alias} size="3xl" src={profile.avatarUrl} />
        </Box>
        <Box width="100%">
          <Text>{JSON.stringify(profile)}</Text>
        </Box>

        {/* <Grid templateColumns="" gap={2}>
        </Grid> */}
      </Container>
    </Layout>
  )
}

export default ProfilePage

function profileTransformer(data: User): TransformedProfile {
  return {
    ...data,
    // TODO: sort by publishedAt=.
    collabs: data.portfolio?.filter(item => !!item.companyName),
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
