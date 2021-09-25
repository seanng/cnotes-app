import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import { Text, Box, Container } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import { User } from 'shared/types'

const OFFER_BY_ID = gql`
  query offerById($id: ID) {
    offerById(id: $id) {
      id
      highestBid
      bidCount
      platform
      deliverable
      description
      deliveryStartsAt
      deliveryEndsAt
      creator {
        portfolio
        alias
        slug
        avatarUrl
      }
      createdAt
      auctionEndsAt
    }
  }
`

type Props = {
  user: User
}

const OfferDetailsPage: NextPage<Props> = ({ user }: Props) => {
  const {
    query: { offerId },
  } = useRouter()

  // maybe move this to getserversideprops? though then how to implement polling?
  const { data, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: offerId },
  })

  return (
    <Layout user={user}>
      <Container>
        {loading ? (
          <Box>loading...</Box>
        ) : (
          <Text>{JSON.stringify(data.offerById)}</Text>
        )}
      </Container>
    </Layout>
  )
}

export default OfferDetailsPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
