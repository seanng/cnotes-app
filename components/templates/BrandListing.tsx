import { useColors } from 'hooks'
import { NextPage } from 'next'
import { gql, useQuery } from '@apollo/client'
import { format, isFuture } from 'date-fns'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { profileTransformer } from 'utils/helpers'
import { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Container,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import ProfileBox from 'components/organisms/ProfileBox'
import ProfileBanner from 'components/atoms/ProfileBanner'
import TimerText from 'components/atoms/TimerText'
import GenderChart from 'components/atoms/GenderChart'
import LocationChart from 'components/atoms/LocationChart'
import { PROFILE_BODY_WIDTH } from 'shared/metrics'
import ProfileReel from 'components/organisms/ProfileReel'
import StatNumbers from 'components/molecules/StatNumbers'
import OfferModal from 'components/molecules/OfferModal'
import ProfileLoadingSkeleton from 'components/molecules/ProfileLoadingSkeleton'
import ProfileCollabs from 'components/organisms/ProfileCollabs'

const LISTING_BY_ID = gql`
  query listingById($id: ID) {
    listingById(id: $id) {
      id
      status
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

function BottomCardInfoItem({
  label,
  value,
}: {
  label: string
  value?: string | number
}): JSX.Element {
  let val = value
  if (typeof value === 'boolean') {
    val = value ? 'Yes' : 'No'
  }
  return value !== undefined ? (
    <Box textStyle="small" mb={4}>
      <Text color="#757474">{label}</Text>
      <Text textTransform="capitalize" fontWeight={600}>
        {val}
      </Text>
    </Box>
  ) : null
}

interface Props {
  user: User
  listingId: string
}

const BrandListing: NextPage<Props> = ({ user, listingId }: Props) => {
  const [listing, setListing] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data } = useQuery(LISTING_BY_ID, {
    variables: { id: listingId },
  })
  const { gray } = useColors()

  useEffect(() => {
    setIsLoading(true)
    if (data && data.listingById) {
      const payload = data.listingById
      const [offer] = payload.offers.filter(o => o.brand.id === user.id)
      setListing({
        id: payload.id,
        status: payload.status,
        deliverable: payload.deliverable,
        platform: payload.platform,
        auctionEndsAt: payload.auctionEndsAt,
        highestOfferValue: payload.highestOfferValue,
        askingPrice: payload.askingPrice,
        offerCount: payload.offers.length,
        specs: payload.specs,
        offer,
        profile: profileTransformer(payload.creator),
      })
      setIsLoading(false)
    }

    if (window && window.$crisp) {
      window.$crisp.push(['do', 'chat:hide'])
    }

    return () => {
      if (window && window.$crisp) {
        window.$crisp.push(['do', 'chat:show'])
      }
    }
  }, [data])

  const handleOfferClick = () => {
    setIsModalOpen(true)
  }

  const genderChart = listing?.profile?.creatorStats?.genderBreakdown
  const locationChart = listing?.profile?.creatorStats?.locationBreakdown
  const lastOffer = listing?.offer?.history[listing?.offer?.history.length - 1]
  const hasTimeLeft = isFuture(new Date(listing?.auctionEndsAt))

  // TODO: add not found page.

  return (
    <Layout user={user}>
      <ProfileBanner src={listing?.profile?.bannerUrl} isLoading={isLoading} />
      <Container display={{ md: 'flex' }} maxWidth={1280}>
        {isLoading ? (
          <ProfileLoadingSkeleton />
        ) : (
          <>
            {listing?.profile && (
              <ProfileBox
                profile={listing.profile}
                listing={listing}
                onOfferClick={handleOfferClick}
                isShort
                position="sticky"
                top={2}
                hasTimeLeft={hasTimeLeft}
                display={['none', null, 'flex']}
              />
            )}
            <Box
              width={['100%', null, PROFILE_BODY_WIDTH]}
              pl={[0, null, '5%', 20]}
              mt={-8}
              pb={[285, null, 0]}
            >
              <Text textStyle={['h3', 'h2']} mb={3}>
                stats
              </Text>
              <Box
                borderRadius="xl"
                p={[5, null, 10]}
                display={['block', null, null, 'flex']}
                bgColor={gray[100]}
                mb={10}
              >
                <StatNumbers data={listing?.profile?.creatorStats} />
                <Box>
                  {genderChart && <GenderChart mb={10} data={genderChart} />}
                  {locationChart && <LocationChart data={locationChart} />}
                </Box>
              </Box>
              {listing?.profile?.collabs && (
                <ProfileCollabs collabs={listing?.profile.collabs} mb={12} />
              )}

              <ProfileReel
                profile={listing.profile}
                gridProps={{
                  templateColumns: [
                    'repeat(1, 1fr)',
                    'repeat(2, 1fr)',
                    'repeat(1, 1fr)',
                    null,
                    'repeat(2, 1fr)',
                  ],
                }}
              />
            </Box>
          </>
        )}
      </Container>
      {/* mobile card */}
      {!isLoading && listing && (
        <Box
          position="fixed"
          bottom={0}
          w="full"
          display={['block', null, 'none']}
          bgColor={gray[0]}
          borderTopRadius="lg"
          pt={4}
        >
          <Flex px={6} align="center" pb={4}>
            <Avatar
              name={listing.profile?.alias}
              src={listing.profile?.avatarUrl}
              mr={5}
            />
            <Box>
              <Text textStyle="h5">{listing.profile?.alias}</Text>
              {listing.profile?.genre && (
                <Text textStyle="microBold">{listing.profile?.genre}</Text>
              )}
            </Box>
          </Flex>
          <SimpleGrid
            columns={4}
            px={6}
            borderBottom="1px solid"
            borderColor={gray[50]}
          >
            <BottomCardInfoItem label="Category" value="Keyboards" />
            <BottomCardInfoItem label="Platform" value={listing.platform} />
            <BottomCardInfoItem
              label="Deliverable"
              value={listing.deliverable}
            />
            <BottomCardInfoItem
              label="Length"
              value={listing.specs?.videoLength}
            />
            <BottomCardInfoItem
              label="Revisions"
              value={listing.specs?.numberOfRevisions}
            />
            <BottomCardInfoItem
              label="Preview"
              value={listing.specs?.previewTime}
            />
            <BottomCardInfoItem
              label="Reusable"
              value={listing.specs?.canReuse}
            />
            <BottomCardInfoItem
              label="Scripted"
              value={listing.specs?.willFollowScript}
            />
            <BottomCardInfoItem
              label="Highest"
              value={`$${listing.highestOfferValue}`}
            />
            <BottomCardInfoItem label="Offers" value={listing.offerCount} />
          </SimpleGrid>
          {hasTimeLeft ? (
            <Flex justify="space-between" px={6} py={5}>
              <Box>
                <Text color="#757474" textStyle="small" mb={1}>
                  Time left
                </Text>
                <TimerText end={listing.auctionEndsAt} />
              </Box>
              <Button w="60%" onClick={handleOfferClick}>
                {listing.offer ? 'Update offer' : 'Place offer'}
              </Button>
            </Flex>
          ) : (
            <Text
              px={6}
              py={5}
              textStyle="small"
              color={gray[700]}
            >{`Listing ended on ${format(
              new Date(listing.auctionEndsAt),
              'd MMM y'
            )}`}</Text>
          )}
        </Box>
      )}
      <OfferModal
        isUpdate={!!listing?.offer}
        listing={listing}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        isOpen={isModalOpen}
        defaultValues={{
          message: lastOffer?.message,
          productUrl: lastOffer?.productUrl,
          productName: lastOffer?.productName,
          productValue: lastOffer?.productValue || 0,
          cashValue: lastOffer?.cashValue || 0,
        }}
      />
    </Layout>
  )
}

export default BrandListing
