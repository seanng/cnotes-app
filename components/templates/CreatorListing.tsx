import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { Listing, User } from 'shared/types'
import { useEffect, useState } from 'react'
import Layout from 'components/organisms/Layout'
import { Box } from '@chakra-ui/react'
import { getListingOrDealStatus } from 'utils/helpers'
import OfferStage from 'components/organisms/OfferStage'
import SelectStage from 'components/organisms/SelectStage'
import DecidedStage from 'components/organisms/DecidedStage'
import { DECIDED, LISTING, SELECTING } from 'shared/constants'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      name
      specs
      iconUrl
      highestOfferValue
      status
      offerCount
      platform
      deliverable
      deals {
        brand {
          id
        }
      }
      offers {
        id
        history {
          cashValue
          message
          productValue
          productUrl
          productName
          createdAtString
        }
        brand {
          id
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
  [LISTING]: OfferStage,
  [SELECTING]: SelectStage,
  [DECIDED]: DecidedStage,
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
      <Component listing={listing} />
    </Layout>
  )
}

export default CreatorListing
