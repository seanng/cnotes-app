import { format, formatDistanceToNow } from 'date-fns'
import {
  Icon,
  Divider,
  Avatar,
  Button,
  Flex,
  Box,
  FlexProps,
  Text,
} from '@chakra-ui/react'
import { useColors } from 'hooks'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import { TransformedProfile, Listing, Offer } from 'shared/types'
import dynamic from 'next/dynamic'
import { Icon as Iconify } from '@iconify/react'
import { CREATOR } from 'shared/constants'

const TimerLabel = dynamic(() => import('components/atoms/TimerLabel'), {
  ssr: false,
})
const LocationChart = dynamic(() => import('components/atoms/LocationChart'), {
  ssr: false,
})
const GenderChart = dynamic(() => import('components/atoms/GenderChart'), {
  ssr: false,
})
const StatNumbers = dynamic(() => import('components/molecules/StatNumbers'), {
  ssr: false,
})

const Social = ({ profile, ...props }: Props & FlexProps): JSX.Element => {
  const { tiktokUrl, youtubeUrl, instagramUrl, facebookUrl } = profile

  return (
    <Flex align="center" {...props}>
      {tiktokUrl && (
        <a href={tiktokUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="bx:bxl-tiktok"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {youtubeUrl && (
        <a href={youtubeUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="akar-icons:youtube-fill"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="ant-design:instagram-filled"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {facebookUrl && (
        <a href={facebookUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="bx:bxl-facebook"
            height="18px"
            width="18px"
          />
        </a>
      )}
    </Flex>
  )
}

const ListingRow = ({
  label,
  value,
}: {
  label: string
  value: string | number | boolean | undefined
}): JSX.Element => {
  let val = value
  if (typeof value === 'boolean') {
    val = value ? 'Yes' : 'No'
  }
  return value !== undefined ? (
    <Flex justify="space-between" mb={1} w="full">
      <Text color="#757474" textStyle="base">
        {label}
      </Text>
      <Text textTransform="capitalize" textStyle="baseBold">
        {val}
      </Text>
    </Flex>
  ) : null
}

type Props = {
  profile: TransformedProfile
  withStats?: boolean
  isShort?: boolean
  onOfferClick?: () => void
  listing?: Listing & { offer: Offer; offerCount: number }
  hasTimeLeft?: boolean
} & FlexProps

const ProfileBox = ({
  profile,
  withStats,
  isShort,
  listing,
  onOfferClick,
  hasTimeLeft,
  ...props
}: Props): JSX.Element => {
  const { gray } = useColors()
  const genderChart = profile.creatorStats?.genderBreakdown
  const locationChart = profile.creatorStats?.locationBreakdown
  return (
    <Flex
      w={`${2 * PROFILE_BOX_WRAPPER_PADDING + PROFILE_BOX_INNER_WIDTH}px`}
      pt={isShort ? '20px' : `${PROFILE_BOX_WRAPPER_PADDING}px`}
      mx="auto"
      mt={-40}
      direction="column"
      align="center"
      bg={gray[0]}
      boxShadow="lg"
      borderRadius="xl"
      alignSelf="flex-start"
      {...props}
    >
      <Avatar
        name={profile.alias}
        size="2xl"
        src={profile.avatarUrl}
        mb={isShort ? 4 : 7}
        alt="avatar"
      />
      {!isShort && profile.createdAt && (
        <Text color="gray.500" textStyle="micro" mb={1}>
          {`Joined ${formatDistanceToNow(new Date(profile.createdAt))} ago`}
        </Text>
      )}
      <Text as="h1" fontSize="32px" fontFamily="heading" mb={2}>
        {profile.alias}
      </Text>
      <Text
        as="h2"
        color={gray[1000]}
        textStyle="micro"
        fontWeight={500}
        mb={3}
      >
        {profile.genre || ''}
      </Text>
      <Social profile={profile} mb={isShort ? 3 : 8} />
      {profile.role === CREATOR && withStats && (
        <>
          <Divider mb={8} opacity={0.4} />
          <Box px={`${PROFILE_BOX_WRAPPER_PADDING}px`} pb={5}>
            <StatNumbers data={profile.creatorStats} mb={7} />
            {genderChart && <GenderChart mb={7} data={genderChart} />}
            {locationChart && <LocationChart mb={7} data={locationChart} />}
            {profile.statsLastVerifiedAt && (
              <Text color={gray[500]} textStyle="micro" fontWeight={600}>
                *Stats were last verified on
                <Box as="span" color={gray[900]}>
                  {` ${format(new Date(profile.statsLastVerifiedAt), 'P')}`}
                </Box>
              </Text>
            )}
          </Box>
        </>
      )}
      {listing && (
        <>
          <Divider mb={isShort ? 4 : 7} opacity={0.4} />
          {hasTimeLeft && (
            <TimerLabel
              pl={6}
              withEmoji={false}
              borderRadius="full"
              end={listing.auctionEndsAt}
              mb={3}
            />
          )}
          <Box w={230}>
            {/* <ListingRow
              label="Category"
              value={profile.category || 'Keyboards'}
            /> */}
            <ListingRow label="Platform" value={listing.platform} />
            <ListingRow label="Deliverable" value={listing.deliverable} />
            <ListingRow label="Length" value={listing.specs?.videoLength} />
            <ListingRow
              label="Revisions"
              value={listing.specs?.numberOfRevisions}
            />
            <ListingRow
              label="Preview Time"
              value={listing.specs?.previewTime}
            />
            <ListingRow label="Reusable" value={listing.specs?.canReuse} />
            <ListingRow
              label="Scripted"
              value={listing.specs?.willFollowScript}
            />
            <ListingRow
              label="Highest Offer"
              value={`$${listing.highestOfferValue.toLocaleString()}`}
            />
            <ListingRow label="Total Offers" value={listing.offerCount} />
            <Divider my={4} />
            {hasTimeLeft ? (
              <Button onClick={onOfferClick} isFullWidth mb={6}>
                {listing.offer ? 'Update offer' : 'Place offer'}
              </Button>
            ) : (
              <Text
                textStyle="base"
                color={gray[700]}
                mb={6}
                textAlign="center"
              >{`Listing ended on ${format(
                new Date(listing.auctionEndsAt),
                'd MMM y'
              )}`}</Text>
            )}
          </Box>
        </>
      )}
    </Flex>
  )
}

export default ProfileBox
