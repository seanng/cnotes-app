import { gql, useQuery } from '@apollo/client'
import { Container } from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from 'next'
import { BRAND } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandListing from 'components/templates/BrandListing'
import CreatorListing from 'components/templates/CreatorListing'

interface Props {
  user: User
}

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

const ListingDetailsPage: NextPage<Props> = ({ user }: Props) => {
  const {
    query: { listingId },
  } = useRouter()

  const { data, loading } = useQuery(OFFER_BY_ID, {
    variables: { id: listingId },
  })

  // TODO: create loading container.
  if (loading) {
    return (
      <Layout user={user}>
        <Container>loading..</Container>
      </Layout>
    )
  }

  if (user.role === BRAND) {
    return <BrandListing user={user} listing={data.offerById} />
  }

  return <CreatorListing user={user} listing={data.offerById} />
}

export default ListingDetailsPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
