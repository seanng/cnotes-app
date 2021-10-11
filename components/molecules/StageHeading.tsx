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
import { Deal, User, Listing } from 'shared/types'
import { statusConfigs } from 'utils/configs'
import { ArrowBackIcon } from '@chakra-ui/icons'

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
  }
}

export default function StageHeading({ data }: Props): JSX.Element {
  const status = getCreatorListingOrDealStatus(data)
  const config = statusConfigs[status]

  const imgSrc = data.iconUrl ? data.iconUrl : data.brand.avatarUrl
  const name = data.name
    ? data.name
    : `${data.listing.deliverable} for ${data.brand.alias}`
  return (
    <>
      <Container mt={4} mb={[6, 10]}>
        <Flex mb={7} align="center">
          <NextLink href="/dashboard">
            <IconButton
              size="lg"
              fontSize="24px"
              variant="unstyled"
              colorScheme="gray"
              icon={<ArrowBackIcon />}
              aria-label="back"
              mr={2}
            />
          </NextLink>
          {config.hasTimer && data.auctionEndsAt && (
            <TimerLabel borderRadius="full" end={data.auctionEndsAt} />
          )}
        </Flex>
        <Flex align="flex-start">
          {imgSrc && (
            <Box mr={8}>
              <Image src={imgSrc} layout="fixed" width={70} height={70} />
            </Box>
          )}
          <Box>
            <Tag
              color="black"
              bgColor="yellow.400"
              variant="card"
              {...config.tagProps}
            >
              {config.text}
            </Tag>
            <Text textStyle="h4" mt={1}>
              {name}
            </Text>
          </Box>
        </Flex>
      </Container>
      <Divider />
    </>
  )
}
