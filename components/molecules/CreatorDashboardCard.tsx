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
import { LISTING } from 'shared/constants'
import { useColors } from 'utils/colors'
import { getListingOrDealStatus } from 'utils/helpers'
import { memo } from 'react'
import dynamic from 'next/dynamic'
import { statuses } from 'utils/configs'
import { CARD_HEIGHT, CARD_ASPECT_RATIO } from 'shared/metrics'

const CountdownTimerLabel = dynamic(
  () => import('components/atoms/CountdownTimerLabel'),
  { ssr: false }
)

type Props = {
  data: (Listing & { brand: never }) | (Listing & Deal)
}

function CreatorDashboardCard({ data }: Props): JSX.Element {
  const { gray } = useColors()
  const statusKey = getListingOrDealStatus(data)
  const status = statuses[statusKey]

  return (
    <Box position="relative">
      <AspectRatio ratio={CARD_ASPECT_RATIO}>
        <LinkBox
          borderRadius="xl"
          bgColor={gray[0]}
          boxShadow="sm"
          bgGradient={status.isUrgent ? 'linear(to-r, #33F3FF, #BED8FF)' : null}
        >
          <Flex
            pt={4}
            justify="space-between"
            width="100%"
            height="100%"
            position="relative"
          >
            <Flex direction="column" justify="space-between">
              {data.auctionEndsAt && (
                <CountdownTimerLabel
                  pl={2}
                  borderRightRadius="full"
                  end={data.auctionEndsAt}
                />
              )}
              <Box
                pl={4}
                position="absolute"
                top={`${(102 / CARD_HEIGHT) * 100}%`}
              >
                <Text
                  fontSize="20px"
                  fontFamily="anton"
                  color={status.isUrgent ? 'gray.900' : gray[900]}
                  textTransform="capitalize"
                  maxWidth="210px"
                  isTruncated
                >
                  {status.type === LISTING
                    ? data.name
                    : `${data.deliverable} for ${data.brand.alias}`}
                </Text>
                <Text
                  textStyle="micro"
                  color={status.isUrgent ? 'gray.600' : 'gray.500'}
                  fontWeight={600}
                  mt={1}
                >
                  {`${
                    status.type === LISTING ? 'Posted' : 'Commenced'
                  } ${format(new Date(data.createdAt), 'dd MMMM')}`}
                </Text>
              </Box>
              {status.type === LISTING && (
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
                    {data.offers.length > 1 &&
                      `🔥 ${data.offers.length} Brands`}
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
              {status.type === LISTING ? (
                // ICON
                <AspectRatio
                  ratio={1}
                  width="67%"
                  position="absolute"
                  bottom="-30%"
                  right="-25%"
                >
                  <Image layout="fill" src={data.iconUrl} />
                </AspectRatio>
              ) : (
                data?.brand?.avatarUrl && (
                  // BRAND LOGO
                  <AspectRatio
                    ratio={1}
                    position="absolute"
                    width="50%"
                    right="-3%"
                    bottom="-20%"
                  >
                    <Box
                      as={Image}
                      borderRadius="full"
                      objectFit="contain"
                      layout="fill"
                      src={data.brand.avatarUrl}
                    />
                  </AspectRatio>
                )
              )}
            </Box>
          </Flex>
          <NextLink href={`/${status.type}/${data.id}`} passHref>
            <LinkOverlay />
          </NextLink>
        </LinkBox>
      </AspectRatio>
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
    </Box>
  )
}

export default memo(CreatorDashboardCard)
