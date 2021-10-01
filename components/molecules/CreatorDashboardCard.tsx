import NextLink from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'
import {
  Tag,
  AvatarGroup,
  Avatar,
  Text,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Deal, Listing } from 'shared/types'
import { SUBMITTING, SELECTING, LISTING, PAYING } from 'shared/constants'
import { useColors } from 'utils/colors'
import { getListingOrDealStatus } from 'utils/helpers'
import { memo } from 'react'
import CountdownTimerLabel from 'components/atoms/CountdownTimerLabel'

type Props = {
  data:
    | Listing
    | (Deal & { iconUrl: never; auctionEndsAt: never; offers: never })
}

const LISTING_TYPE = 'listing'
const DEAL_TYPE = 'deal'

const statuses = {
  [SUBMITTING]: {
    text: 'Submitting',
    bg: 'pink.400',
    color: 'white',
    type: DEAL_TYPE,
  },
  [LISTING]: {
    text: 'Listing',
    bg: 'yellow.400',
    color: 'black',
    type: LISTING_TYPE,
  },
  [SELECTING]: {
    text: 'Select Brands',
    bg: 'pink.400',
    color: 'white',
    type: LISTING_TYPE,
  },
  [PAYING]: {
    text: 'Payment Processing',
    bg: 'pink.400',
    color: 'white',
    type: DEAL_TYPE,
  },
}

function CreatorDashboardCard({ data }: Props): JSX.Element {
  const { gray } = useColors()
  const statusKey = getListingOrDealStatus(data)
  const status = statuses[statusKey]
  // const brands = data.offers.map(({ brand }) => brand)

  return (
    <AspectRatio ratio={368 / 242}>
      <LinkBox
        borderRadius="xl"
        bgColor={gray[0]}
        overflow="hidden"
        boxShadow="md"
      >
        <Flex pt={4} justify="space-between" width="100%" height="100%">
          <Flex direction="column" justify="space-between">
            {data.auctionEndsAt && (
              <CountdownTimerLabel end={data.auctionEndsAt} />
            )}
            <Box pl={4} position="absolute" top={`${(102 / 242) * 100}%`}>
              <Text fontSize="20px" fontFamily="anton">
                Integration for xxxx
              </Text>
              <Text textStyle="micro" color={gray[500]} fontWeight={600} mt={1}>
                {`Posted ${format(new Date(data.createdAt), 'dd MMM')}`}
              </Text>
            </Box>
            {data.offers && (
              <Flex align="center" pb={4} pl={4}>
                <AvatarGroup spacing={-2} size="sm" max={3}>
                  {data.offers.map(({ brand }) => (
                    <Avatar
                      key={brand.alias}
                      name={brand.alias}
                      src={brand.avatarUrl}
                    />
                  ))}
                </AvatarGroup>
                <Text
                  textStyle="micro"
                  fontWeight={600}
                  color={gray[500]}
                  pl={1}
                >
                  {`🔥 ${data.offers.length} Brands`}
                </Text>
              </Flex>
            )}
          </Flex>
          <Box>
            <Tag mr={4} variant="card" color={status.color} bgColor={status.bg}>
              {status.text}
            </Tag>
          </Box>
        </Flex>
        <NextLink href={`/${status.type}/${data.id}`} passHref>
          <LinkOverlay>
            <AspectRatio
              ratio={1}
              width="67%"
              position="absolute"
              bottom="-30%"
              right="-20%"
            >
              {status.type === LISTING_TYPE && (
                <Image layout="fill" src={data.iconUrl} />
              )}
            </AspectRatio>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </AspectRatio>
  )
}

export default memo(CreatorDashboardCard)
