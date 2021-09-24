import NextLink from 'next/link'
import CountdownTimer from 'components/atoms/CountdownTimer'
import { useQuery, gql } from '@apollo/client'
import {
  Avatar,
  Container,
  LinkOverlay,
  LinkBox,
  Text,
  Box,
  SimpleGrid,
  chakra as c,
  Flex,
} from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { GetServerSideProps, NextPage } from 'next'
// import { ACTIVE } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'

const OffersQuery = gql`
  query DiscoveryOffers {
    discoveryOffers {
      id
      highestBid
      bidCount
      platform
      deliverable
      description
      creator {
        alias
        slug
        avatarUrl
      }
      createdAt
      auctionEndsAt
    }
  }
`

type Props = {
  user: User
}

const DiscoverPage: NextPage<Props> = ({ user }: Props) => {
  const { data, loading } = useQuery(OffersQuery, {
    // fetchPolicy: 'cache-and-network',
  })

  return (
    <Layout user={user}>
      <Container>
        <c.h4 textStyle="h4" mt={20} mb={14}>
          Discover New Offers
        </c.h4>
        {loading ? (
          <Box>Loading offers...</Box>
        ) : (
          <SimpleGrid columns={[1, null, 2, 3]} gap={4}>
            {data?.discoveryOffers.map(offer => (
              <LinkBox
                _hover={{ shadow: 'xl' }}
                key={offer.id}
                borderRadius="xl"
                boxShadow="md"
                p={6}
              >
                <NextLink href={`/offer/${offer.id}`} passHref>
                  <LinkOverlay>
                    <CountdownTimer
                      end={offer.auctionEndsAt}
                      prefix="Ends in"
                      textStyle="small"
                      mb={4}
                    />
                    <Box borderRadius="md" p={4} bgColor="gray.300" mb={4}>
                      <Text noOfLines={3} textStyle="mini">
                        {offer.description}
                      </Text>
                    </Box>
                    <Box
                      display={['block', 'flex']}
                      justifyContent="space-between"
                    >
                      <Box>
                        <Box textStyle="base">{`${offer.platform} ${offer.deliverable}`}</Box>
                        <Flex align="center">
                          <Avatar
                            name={offer.creator.alias}
                            size="sm"
                            src={offer.creator.avatarUrl}
                          />
                          <Flex
                            direction="column"
                            ml={CREATOR_AVATAR_TEXT_SPACING}
                          >
                            <Box>{offer.creator.alias}</Box>
                            {/* <Box textStyle="mini">10k viewers</Box> */}
                          </Flex>
                        </Flex>
                      </Box>
                      <Box>
                        <Box textStyle="xLarge">
                          ${offer.highestBid.toLocaleString()}
                        </Box>
                        <Box textStyle="mini">{offer.bidCount} bids</Box>
                      </Box>
                    </Box>
                  </LinkOverlay>
                </NextLink>
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
