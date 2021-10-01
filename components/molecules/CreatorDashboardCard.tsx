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
import dynamic from 'next/dynamic'

const CountdownTimerLabel = dynamic(
  () => import('components/atoms/CountdownTimerLabel'),
  { ssr: false }
)

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
    type: DEAL_TYPE,
    isUrgent: true,
  },
  [LISTING]: {
    text: 'Listing',
    type: LISTING_TYPE,
  },
  [SELECTING]: {
    text: 'Select Brands',
    type: LISTING_TYPE,
    isUrgent: true,
  },
  [PAYING]: {
    text: 'Payment Processing',
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
        bgColor={status.isUrgent ? 'cyan.500' : gray[0]}
        boxShadow="md"
      >
        <Flex
          pt={4}
          justify="space-between"
          width="100%"
          height="100%"
          position="relative"
          overflow="hidden"
        >
          <Flex direction="column" justify="space-between">
            {data.auctionEndsAt && (
              <CountdownTimerLabel end={data.auctionEndsAt} />
            )}
            <Box pl={4} position="absolute" top={`${(102 / 242) * 100}%`}>
              <Text
                fontSize="20px"
                fontFamily="anton"
                color={status.isUrgent ? 'gray.900' : gray[900]}
              >
                Integration for xxxx
              </Text>
              <Text
                textStyle="micro"
                color={status.isUrgent ? 'gray.600' : 'gray.500'}
                fontWeight={600}
                mt={1}
              >
                {`Posted ${format(new Date(data.createdAt), 'dd MMMM')}`}
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
                  color={status.isUrgent ? 'gray.600' : 'gray.500'}
                  pl={1}
                >
                  {`🔥 ${data.offers.length} Brands`}
                </Text>
              </Flex>
            )}
          </Flex>
          <Box>
            <Tag
              mr={4}
              variant="card"
              color={status.isUrgent ? 'white' : 'black'}
              bgColor={status.isUrgent ? 'pink.400' : 'yellow.400'}
            >
              {status.text}
            </Tag>
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
          </Box>
        </Flex>
        <NextLink href={`/${status.type}/${data.id}`} passHref>
          <LinkOverlay />
        </NextLink>
        {status.isUrgent && (
          <Box
            bgColor="pink.500"
            h={6}
            w={6}
            borderRadius="full"
            position="absolute"
            right={-2}
            top={-2}
          />
        )}
      </LinkBox>
    </AspectRatio>
  )
}

export default memo(CreatorDashboardCard)
