import NextLink from 'next/link'
import {
  Container,
  Divider,
  Wrap,
  Link,
  WrapItem,
  Text,
  Box,
  Tag,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { getCreatorListingOrDealStatus } from 'utils/helpers'
import { Deal, User, Listing, ListingSpecs, Offer } from 'shared/types'
import { CREATOR_DASH_DETAILS_CARD_WIDTH } from 'shared/metrics'
import { statusConfigs } from 'utils/configs'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useColors } from 'hooks'

const IMG_WIDTH = 75
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
  specs: ListingSpecs
}

export default function StageHeading({ data, specs }: Props): JSX.Element {
  const status = getCreatorListingOrDealStatus(data)
  const config = statusConfigs[status]
  const imgSrc = data.iconUrl ? data.iconUrl : data.brand.avatarUrl
  const { gray } = useColors()
  const name = data.name
    ? data.name
    : `${data.listing.deliverable} for ${data.brand.alias}`
  const offerCount = data.offers?.length || 0
  return (
    <>
      <Container mt={4} mb={[3, 5]}>
        <Flex mb={7} align="center">
          <NextLink href="/dashboard">
            <Flex>
              <IconButton
                size="lg"
                fontSize="24px"
                variant="unstyled"
                colorScheme="gray"
                icon={<ArrowBackIcon />}
                aria-label="back"
                ml={-4}
              />
              {!config.hasTimer && (
                <Link
                  textStyle="large"
                  lineHeight="48px"
                  mb="-3px"
                  _hover={{ textDecoration: 'none' }}
                >
                  Dashboard
                </Link>
              )}
            </Flex>
          </NextLink>
          {config.hasTimer && data.auctionEndsAt && (
            <TimerLabel borderRadius="full" end={data.auctionEndsAt} ml={2} />
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
          <Box
            width={`calc(100% - ${IMG_MR}px - ${IMG_WIDTH}px)`}
            maxWidth={CREATOR_DASH_DETAILS_CARD_WIDTH - IMG_MR - IMG_WIDTH}
          >
            <Tag fontSize="12px" {...config.tagProps}>
              {config.text}
            </Tag>
            <Text textStyle={'h4'} mt={1} noOfLines={1}>
              {name}
            </Text>
            <Text
              fontSize={['12px', '14px']}
              mt={1}
              noOfLines={1}
              color={gray[600]}
            >
              {data.description || data.listing?.description}
            </Text>
            <Wrap
              textStyle="microBold"
              fontSize={['10px', '12px']}
              my={2}
              noOfLines={1}
              color={gray[600]}
              spacing={3}
            >
              {offerCount === 1 && <WrapItem>1 Brand</WrapItem>}
              {offerCount > 1 && (
                <>
                  <WrapItem>
                    <Box as="span" mr={2}>
                      🔥
                    </Box>
                    <Box as="span">{offerCount} brands</Box>
                  </WrapItem>
                  <WrapItem>
                    <Box as="span" mr={2}>
                      📈
                    </Box>
                    <Box as="span">
                      ${data.highestOfferValue.toLocaleString()} Highest Offer
                    </Box>
                  </WrapItem>
                </>
              )}
              {specs.videoLength && (
                <WrapItem>
                  <Box as="span" mr={2}>
                    🎥
                  </Box>
                  <Box mr={3} as="span">
                    {specs.videoLength}
                  </Box>
                </WrapItem>
              )}
              {specs.numberOfRevisions > 0 && (
                <WrapItem>
                  <Box as="span" mr={2}>
                    ✍🏼
                  </Box>
                  <Box mr={3} as="span">
                    {`${specs.numberOfRevisions} revisions`}
                  </Box>
                </WrapItem>
              )}
              {specs.previewTime && (
                <WrapItem>
                  <Box as="span" mr={2}>
                    👁
                  </Box>
                  <Box mr={3} as="span">
                    {`${specs.previewTime} preview`}
                  </Box>
                </WrapItem>
              )}
              {specs.canReuse && (
                <WrapItem>
                  <Box as="span" mr={2}>
                    🤝
                  </Box>
                  <Box as="span">Reusable</Box>
                </WrapItem>
              )}
              {specs.willFollowScript && (
                <WrapItem>
                  <Box as="span" mr={2}>
                    🗒
                  </Box>
                  <Box as="span">Scripted</Box>
                </WrapItem>
              )}
            </Wrap>
          </Box>
        </Flex>
      </Container>
      <Divider />
    </>
  )
}
