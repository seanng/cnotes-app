import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { useEffect, useState } from 'react'
import { Box, Container } from '@chakra-ui/react'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      highestOfferValue
      offerCount
      platform
      deliverable
      description
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

interface Props {
  user: User
  listingId: string
}

const BrandListing: NextPage<Props> = ({ user, listingId }: Props) => {
  const [listing, setListing] = useState(null)
  const { data, loading } = useQuery(LISTING_BY_ID, {
    variables: { id: listingId },
  })

  useEffect(() => {
    if (data && data.listingById) {
      setListing(data.listingById)
    }
  }, [data])

  console.log('listing: ', listing)

  return (
    <Layout user={user}>
      <Container>
        {loading ? (
          <Box>loading...</Box>
        ) : (
          <Box>this is the brand listing page</Box>
        )}
      </Container>
    </Layout>
  )
}

export default BrandListing
