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
import { Deal, User, Listing } from 'shared/types'
import { statusConfigs } from 'utils/configs'

const CountdownTimerLabel = dynamic(
  () => import('components/atoms/CountdownTimerLabel'),
  { ssr: false }
)

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
  const { gray } = useColors()
  const status = getListingOrDealStatus(data)
  const config = statusConfigs[status]
  const imgSrc = data.iconUrl ? data.iconUrl : data.brand.avatarUrl
  const name = data.name
    ? data.name
    : `${data.listing.deliverable} for ${data.brand.alias}`
  return (
    <>
      <Container mt={4} mb={[6, 10]}>
        {config.hasTimer && data.auctionEndsAt && (
          <CountdownTimerLabel
            borderRadius="full"
            end={data.auctionEndsAt}
            mb={7}
          />
        )}
        <Flex align="flex-start">
          <Center bgColor={gray[0]} borderRadius="full" p={4} mr={4}>
            {imgSrc && (
              <Image src={imgSrc} layout="fixed" width={40} height={40} />
            )}
          </Center>
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
