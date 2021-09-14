import { gql } from '@apollo/client'
import { Text, Container } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User } from 'shared/types'
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
      avatarUrl
      createdAt
    }
  }
`

type Props = {
  profile: User
  user: User
}

const ProfilePage: NextPage<Props> = ({ profile, user }: Props) => {
  return (
    <Layout user={user}>
      <Container>
        <Text>{JSON.stringify(profile)}</Text>
      </Container>
    </Layout>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data } = await client.query({
    query: PROFILE_BY_SLUG,
    variables: { slug: ctx.params.slug },
  })
  const user = getUserPayload(ctx.req.headers.cookie)
  return { props: { profile: data.profileBySlug, user } }
}
