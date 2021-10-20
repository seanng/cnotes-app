import NextLink from 'next/link'
import {
  Container,
  Divider,
  Text,
  Box,
  Tag,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { getCreatorListingOrDealStatus } from 'utils/helpers'
import { Deal, User, Listing, Offer } from 'shared/types'
import { CREATOR_DASH_DETAILS_CARD_WIDTH } from 'shared/metrics'
import { statusConfigs } from 'utils/configs'
import { ArrowBackIcon } from '@chakra-ui/icons'

const IMG_WIDTH = 100
const IMG_MR = 32

const TimerLabel = dynamic(() => import('components/atoms/TimerLabel'), {
  ssr: false,
})

type Props = {
  data: (Listing | Deal) & {
    auctionEndsAt?: string
    iconUrl?: string
    name?: string
    brand?: User
    listing?: Listing
    offers?: Offer[]
    highestOfferValue?: number
    description?: string
  }
}

export default function StageHeading({ data }: Props): JSX.Element {
  const status = getCreatorListingOrDealStatus(data)
  const config = statusConfigs[status]
  const imgSrc = data.iconUrl ? data.iconUrl : data.brand.avatarUrl
  const name = data.name
    ? data.name
    : `${data.listing.deliverable} for ${data.brand.alias}`
  const offerCount = data.offers?.length || 0
  return (
    <>
      <Container mt={4} mb={[3, 5]}>
        <Flex mb={7} align="center">
          <NextLink href="/dashboard">
            <IconButton
              size="lg"
              fontSize="24px"
              variant="unstyled"
              colorScheme="gray"
              icon={<ArrowBackIcon />}
              aria-label="back"
              ml={-4}
            />
          </NextLink>
          {config.hasTimer && data.auctionEndsAt ? (
            <TimerLabel borderRadius="full" end={data.auctionEndsAt} ml={2} />
          ) : (
            <Text textStyle="large" lineHeight="48px" mb="-3px">
              Dashboard
            </Text>
          )}
        </Flex>
        <Flex align="flex-start">
          {imgSrc && (
            <Box mr={`${IMG_MR}px`}>
              <Image
                src={imgSrc}
                layout="fixed"
                width={IMG_WIDTH}
                height={IMG_WIDTH}
              />
            </Box>
          )}
          <Box maxWidth={CREATOR_DASH_DETAILS_CARD_WIDTH - IMG_MR - IMG_WIDTH}>
            <Tag fontSize="12px" {...config.tagProps}>
              {config.text}
            </Tag>
            <Text textStyle={'h4'} mt={1} noOfLines={1}>
              {name}
            </Text>
            <Text fontSize={['12px', '14px']} mt={1} noOfLines={1}>
              {data.description || data.listing?.description}
            </Text>
            <Text textStyle="micro" my={2} noOfLines={1}>
              {offerCount === 1 && (
                <Box as="span" mr={2}>
                  1 Brand
                </Box>
              )}
              {offerCount > 1 && (
                <>
                  <Box as="span" mr={2}>
                    🔥 {offerCount} brands
                  </Box>
                  <Box as="span">
                    📈 ${data.highestOfferValue} Highest Offer
                  </Box>
                </>
              )}
            </Text>
          </Box>
        </Flex>
      </Container>
      <Divider />
    </>
  )
}
