import {
  Container,
  Center,
  Divider,
  Text,
  Box,
  Tag,
  Flex,
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useColors } from 'utils/colors'
import { getListingOrDealStatus } from 'utils/helpers'
import { Listing } from 'shared/types'
import { statuses } from 'utils/configs'

const CountdownTimerLabel = dynamic(
  () => import('components/atoms/CountdownTimerLabel'),
  { ssr: false }
)

type Props = {
  listing: Listing
}

export default function StageHeading({ listing }: Props): JSX.Element {
  const { gray } = useColors()
  const statusKey = getListingOrDealStatus(listing)
  const status = statuses[statusKey]

  return (
    <>
      <Container mt={4} mb={[6, 10]}>
        <CountdownTimerLabel
          borderRadius="full"
          end={listing.auctionEndsAt}
          mb={7}
        />
        <Flex align="flex-start">
          <Center bgColor={gray[0]} borderRadius="full" p={4} mr={4}>
            <Image
              src={listing.iconUrl}
              layout="fixed"
              width={40}
              height={40}
            />
          </Center>
          <Box>
            <Tag
              color={status.isUrgent ? 'white' : 'black'}
              bgColor={status.isUrgent ? 'pink.400' : 'yellow.400'}
              variant="card"
            >
              {status.text}
            </Tag>
            <Text textStyle="h4" mt={1}>
              {listing.name}
            </Text>
          </Box>
        </Flex>
      </Container>
      <Divider />
    </>
  )
}
