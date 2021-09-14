import { gql } from '@apollo/client'
import { Text, Container } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User } from 'shared/types'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'

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

const ProfileBySlug = gql`
  query ProfileBySlug($slug: String!) {
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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { data } = await client.query({
    query: ProfileBySlug,
    variables: { slug: ctx.params.slug },
  })
  const user = getUserPayload(ctx.req.headers.cookie)
  return { props: { profile: data.profileBySlug, user } }
}
