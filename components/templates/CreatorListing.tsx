import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { Listing, User } from 'shared/types'
import { useEffect, useState } from 'react'
import Layout from 'components/organisms/Layout'
import { Box, Container } from '@chakra-ui/react'
import { getListingOrDealStatus } from 'utils/helpers'
import ListingStage from 'components/organisms/ListingStage'
import SelectingStage from 'components/organisms/SelectingStage'
import { LISTING, SELECTING } from 'shared/constants'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      highestOffer
      status
      offerCount
      platform
      deliverable
      offers {
        id
        history {
          price
          date
          message
          productUrl
        }
        brand {
          alias
          avatarUrl
        }
      }
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

const stageComponents = {
  [LISTING]: ListingStage,
  [SELECTING]: SelectingStage,
}

const Loading = () => <Box>Loading</Box>

const NotFound = () => <Box>Not Found</Box>

function getComponent(
  loading,
  listing: Listing | null
): ({ listing }) => JSX.Element {
  if (loading) return Loading
  if (!listing || !listing.status) return NotFound

  const status = getListingOrDealStatus(listing)
  return stageComponents[status]
}

const CreatorListing: NextPage<Props> = ({ user, listingId }: Props) => {
  const [listing, setListing] = useState<Listing | null>(null)
  const { data, loading } = useQuery(LISTING_BY_ID, {
    variables: { id: listingId },
  })

  useEffect(() => {
    if (data && data.listingById) {
      setListing(data.listingById)
    }
  }, [data])

  const Component = getComponent(loading, listing)

  return (
    <Layout user={user}>
      <Container>
        <Component listing={listing} />
      </Container>
    </Layout>
  )
}

export default CreatorListing
