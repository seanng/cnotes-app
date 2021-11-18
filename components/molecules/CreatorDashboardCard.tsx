import NextLink from 'next/link'
import { format } from 'date-fns'
import { Icon as Iconify } from '@iconify/react'
import Image from 'next/image'
import {
  Tag,
  AvatarGroup,
  Avatar,
  Icon,
  Text,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Flex,
  Box,
} from '@chakra-ui/react'
import { Deal, Listing, DealStatus, ListingStatus } from 'shared/types'
import { DEAL, LISTING } from 'shared/constants'
import { useColors } from 'hooks'
import { getCreatorListingOrDealStatus } from 'utils/helpers'
import dynamic from 'next/dynamic'
import { platformIconSlugs, statusConfigs } from 'utils/configs'
import { CARD_HEIGHT, CARD_ASPECT_RATIO } from 'shared/metrics'

const TimerLabel = dynamic(() => import('components/atoms/TimerLabel'), {
  ssr: false,
})

interface Data extends Omit<Listing, 'status'>, Omit<Deal, 'status'> {
  status: DealStatus | ListingStatus
}

type Props = {
  data: Data
}

function CreatorDashboardCard({ data }: Props): JSX.Element {
  const { gray } = useColors()
  const status = getCreatorListingOrDealStatus(data)
  const config = statusConfigs[status]

  return (
    <Box position="relative" maxW={412}>
      <AspectRatio ratio={CARD_ASPECT_RATIO}>
        <LinkBox
          borderRadius="xl"
          bgColor={gray[0]}
          boxShadow="sm"
          bgGradient={config.isUrgent ? 'linear(to-r, #7BD3EC, #00A3FF)' : null}
        >
          <Flex
            pt={4}
            justify="space-between"
            width="100%"
            height="100%"
            position="relative"
          >
            <Flex direction="column" justify="space-between">
              {config.type === DEAL ? (
                <>
                  <Box />
                  <Flex
                    pb={4}
                    pl={4}
                    textStyle="microBold"
                    align="center"
                    color={config.isUrgent ? 'gray.600' : 'gray.500'}
                  >
                    <Icon
                      as={Iconify}
                      ml={1}
                      mr={2}
                      fontSize="16px"
                      icon={platformIconSlugs[data.platform]}
                    />
                    <span>{data.deliverable}</span>
                  </Flex>
                </>
              ) : (
                <>
                  <TimerLabel
                    pl={2}
                    borderRightRadius="full"
                    end={data.auctionEndsAt}
                  />
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
                      color={config.isUrgent ? 'gray.600' : 'gray.500'}
                      pl={1}
                    >
                      {data.offers.length > 1 &&
                        `🔥 ${data.offers.length} Brands`}
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>
            <Box
              pl={4}
              position="absolute"
              top={`${(102 / CARD_HEIGHT) * 100}%`}
            >
              <Text
                fontSize="20px"
                fontFamily="anton"
                color={config.isUrgent ? 'gray.900' : gray[900]}
                textTransform="capitalize"
                maxWidth="210px"
                isTruncated
              >
                {config.type === LISTING ? data.name : data.brand.alias}
              </Text>
              <Text
                textStyle="micro"
                color={config.isUrgent ? 'gray.600' : 'gray.500'}
                fontWeight={600}
                mt={1}
              >
                {`${config.type === LISTING ? 'Posted' : 'Commenced'} ${format(
                  new Date(data.createdAt),
                  'dd MMMM'
                )}`}
              </Text>
            </Box>
            <Box>
              <Tag mr={4} {...config.tagProps}>
                {config.text}
              </Tag>
              {config.type === LISTING ? (
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
              ) : data?.brand?.avatarUrl ? (
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
              ) : (
                <AspectRatio
                  ratio={1}
                  position="absolute"
                  width="45%"
                  right="-6%"
                  bottom="-10%"
                >
                  <Avatar
                    name={data?.brand?.alias}
                    size="full"
                    fontSize={86}
                    opacity="70%"
                  />
                </AspectRatio>
              )}
            </Box>
          </Flex>
          <NextLink href={`/${config.type}/${data.id}`} passHref>
            <LinkOverlay />
          </NextLink>
        </LinkBox>
      </AspectRatio>
      {config.isUrgent && (
        <Box
          className="animate__animated animate__heartBeat animate__infinite"
          bgColor="pink.500"
          h={4}
          w={4}
          borderRadius="full"
          position="absolute"
          right={-2}
          top={-2}
        />
      )}
    </Box>
  )
}

export default CreatorDashboardCard
