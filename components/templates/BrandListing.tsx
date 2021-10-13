import { useColors } from 'hooks'
import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { profileTransformer } from 'utils/helpers'
import { useEffect, useState } from 'react'
import { Box, Container, Text } from '@chakra-ui/react'
import ProfileBox from 'components/organisms/ProfileBox'
import ProfileBanner from 'components/atoms/ProfileBanner'
import GenderChart from 'components/atoms/GenderChart'
import LocationChart from 'components/atoms/LocationChart'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import ProfileReel from 'components/organisms/ProfileReel'
import StatNumbers from 'components/molecules/StatNumbers'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      status
      minCashValue
      specs
      highestOfferValue
      offers {
        brand {
          id
        }
        history {
          message
          cashValue
          productValue
          productName
          productUrl
        }
      }
      platform
      deliverable
      description
      creator {
        portfolio
        alias
        slug
        bannerUrl
        avatarUrl
        tiktokUrl
        youtubeUrl
        instagramUrl
        facebookUrl
        genre
        creatorStats
        statsLastVerifiedAt
      }
      createdAt
      auctionEndsAt
    }
  }
`

const LoadingSkeleton = () => {
  return <Box>loading...</Box>
}

interface Props {
  user: User
  listingId: string
}

const BrandListing: NextPage<Props> = ({ user, listingId }: Props) => {
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useQuery(LISTING_BY_ID, {
    variables: { id: listingId },
  })
  const { gray } = useColors()

  useEffect(() => {
    setIsLoading(true)
    if (data && data.listingById) {
      const payload = data.listingById
      const offer = payload.offers.filter(o => o.brand.id === user.id)
      setListing({
        id: payload.id,
        status: payload.status,
        deliverable: payload.deliverable,
        platform: payload.platform,
        auctionEndsAt: payload.auctionEndsAt,
        highestOfferValue: payload.highestOfferValue,
        minCashValue: payload.minCashValue,
        offerCount: payload.offers.length,
        offer,
        profile: profileTransformer(payload.creator),
      })
      setIsLoading(false)
    }
  }, [data])

  const handleOfferClick = () => {
    console.log('click offer btn')
  }

  const profileBodyWidth = `calc(100% - ${PROFILE_BOX_INNER_WIDTH}px - ${PROFILE_BOX_WRAPPER_PADDING}px)`
  const genderChart = listing?.profile?.creatorStats?.genderBreakdown
  const locationChart = listing?.profile?.creatorStats?.locationBreakdown

  return (
    <Layout user={user}>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <ProfileBanner src={listing?.profile?.bannerUrl} />
          <Container display={{ md: 'flex' }} maxWidth={1280}>
            {listing.profile && (
              <ProfileBox
                profile={listing.profile}
                listing={listing}
                onOfferClick={handleOfferClick}
                isShort
                position="sticky"
                top={2}
                display={['none', null, 'flex']}
              />
            )}
            <Box
              width={['100%', null, profileBodyWidth]}
              pl={[0, null, '5%', 20]}
              mt={[7, null, -8]}
            >
              <Text textStyle="h2" mb={3}>
                stats
              </Text>
              <Box
                borderRadius="xl"
                p={[5, null, 10]}
                display={['block', null, null, 'flex']}
                bgColor={gray[100]}
                mb={10}
              >
                <StatNumbers data={listing.profile.creatorStats} />
                <Box>
                  {genderChart && <GenderChart mb={10} data={genderChart} />}
                  {locationChart && <LocationChart data={locationChart} />}
                </Box>
              </Box>

              <ProfileReel
                profile={listing.profile}
                gridProps={{
                  templateColumns: [
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                  ],
                }}
              />
            </Box>
          </Container>
        </>
      )}
    </Layout>
  )
}

export default BrandListing
