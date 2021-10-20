import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { Listing, User } from 'shared/types'
import { useEffect, useState } from 'react'
import Layout from 'components/organisms/Layout'
import CreatorListingSkeleton from 'components/molecules/CreatorListingSkeleton'
import NotFound from 'components/organisms/404'
import { getCreatorListingOrDealStatus } from 'utils/helpers'
import OfferStage from 'components/organisms/OfferStage'
import SelectStage from 'components/organisms/SelectStage'
import DecidedStage from 'components/organisms/DecidedStage'
import NoOffersStage from 'components/organisms/NoOffersStage'
import { DECIDED, LISTING, SELECTING, NO_OFFERS } from 'shared/constants'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      name
      specs
      description
      iconUrl
      highestOfferValue
      status
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
  [NO_OFFERS]: NoOffersStage,
  [DECIDED]: DecidedStage,
}

function getComponent(
  loading,
  listing: Listing | null
): ({ listing }) => JSX.Element {
  if (loading) return CreatorListingSkeleton
  if (!listing || !listing.status) return NotFound

  const status = getCreatorListingOrDealStatus(listing)
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
