import NextLink from 'next/link'
import { useQuery, gql } from '@apollo/client'
import {
  Skeleton,
  Avatar,
  Container,
  Tag,
  Tooltip,
  Icon,
  IconProps,
  Button,
  Image,
  LinkOverlay,
  LinkBox,
  Text,
  Box,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { useEffect, useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Listing, User } from 'shared/types'
import { Icon as Iconify } from '@iconify/react'
import { getUserPayload } from 'utils/auth'
import { useColors } from 'hooks'
import { redirTo } from 'utils/helpers'
import { PLACEHOLDER_BANNER_URL } from 'shared/constants'
import TimerLabel from 'components/atoms/TimerLabel'

const ListingsQuery = gql`
  query DiscoveryListings {
    discoveryListings {
      id
      highestOfferValue
      askingPrice
      platform
      deliverable
      description
      creator {
        alias
        slug
        avatarUrl
        bannerUrl
        genre
        creatorStats
      }
      offers {
        id
      }
      createdAt
      auctionEndsAt
    }
  }
`

function LoadingSkeleton(): JSX.Element {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <SimpleGrid columns={[1, 2, null, 3, 4]} gap={4}>
      {arr.map(a => (
        <Skeleton key={a} borderRadius="xl" height={384} />
      ))}
    </SimpleGrid>
  )
}

interface StatProps extends IconProps {
  icon: string
  helpText: string
  label: string
}

function Stat({ icon, helpText, label, ...iconProps }: StatProps): JSX.Element {
  return (
    <>
      <Tooltip label={helpText} hasArrow placement="top">
        <Icon mb="2px" mr={1} as={Iconify} icon={icon} {...iconProps} />
      </Tooltip>
      {label}
    </>
  )
}

type Props = {
  user: User
}

const DiscoverPage: NextPage<Props> = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [listings, setListings] = useState<Listing[]>([])
  const { data } = useQuery(ListingsQuery, {
    // fetchPolicy: 'cache-and-network',
  })
  const { gray } = useColors()

  useEffect(() => {
    if (data && data.discoveryListings) {
      setIsLoading(true)
      setListings(data.discoveryListings)
      setIsLoading(false)
    }
  }, [data])

  return (
    <Layout user={user}>
      <Container pt={9}>
        <Text mb={8} textStyle={['h4', 'h2']}>
          discover new listings
        </Text>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <SimpleGrid columns={[1, 2, null, 3, 4]} gap={4}>
            {listings.map(listing => (
              <LinkBox
                boxShadow="md"
                _hover={{ boxShadow: '0 0 0 2px #18E739' }}
                borderRadius="xl"
                bgColor={gray[0]}
                key={listing.id}
              >
                <Flex direction="column" alignSelf="flex-start" h="full" pb={5}>
                  <Image
                    src={listing.creator.bannerUrl || PLACEHOLDER_BANNER_URL}
                    alt="bg"
                    objectFit="cover"
                    borderTopRadius="xl"
                    h={120}
                  />
                  <Flex
                    position="absolute"
                    justify="space-between"
                    w="full"
                    h="full"
                    alignItems="flex-start"
                    pt={2}
                    pr={2}
                  >
                    <TimerLabel
                      end={listing.auctionEndsAt}
                      withEmoji={false}
                      bgColor="black"
                      borderRightRadius="full"
                    />
                    <Box pt={1}>
                      <Tag mb={1}>{listing.deliverable}</Tag>
                    </Box>
                  </Flex>
                  <Flex direction="column" align="center" px={4}>
                    <Avatar
                      mt={-12}
                      mb={5}
                      borderRadius="full"
                      src={listing.creator.avatarUrl}
                      name={listing.creator.alias}
                      size="xl"
                    />
                    <Text textStyle="h5" fontSize="26px">
                      {listing.creator.alias}
                    </Text>
                    <Text textStyle="microBold">{listing.creator.genre}</Text>
                    <Text textStyle="mini" zIndex={1} my={3}>
                      {listing.creator.creatorStats?.avgImpressions && (
                        <Stat
                          helpText="Average no. of views per video"
                          icon="akar-icons:eye"
                          label={listing.creator.creatorStats?.avgImpressions}
                        />
                      )}
                      <Stat
                        helpText={
                          listing.offers?.length > 0
                            ? 'Current highest offer'
                            : "The creator's asking price"
                        }
                        icon="bi:arrow-up-circle"
                        label={`$${
                          listing.offers?.length > 0
                            ? listing.highestOfferValue
                            : listing.askingPrice
                        }`}
                        ml={2}
                      />
                      <Stat
                        helpText="Total number of offers"
                        icon="eva:checkmark-circle-fill"
                        label={`${listing.offers?.length || 0} offers`}
                        ml={2}
                      />
                    </Text>
                    <Text color={gray[600]} noOfLines={1} mb={5} height="24px">
                      {listing.description ? `"${listing.description}"` : ''}
                    </Text>
                    <NextLink href={`/listing/${listing.id}`} passHref>
                      <LinkOverlay w="full">
                        <Button
                          size="sm"
                          isFullWidth
                          variant="outline"
                          borderWidth="2px"
                        >
                          View
                        </Button>
                      </LinkOverlay>
                    </NextLink>
                  </Flex>
                </Flex>
              </LinkBox>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </Layout>
  )
}

export default DiscoverPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
