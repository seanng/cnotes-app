import { NextPage } from 'next'
import LinkButton from 'components/atoms/LinkButton'
import NextLink from 'next/link'
import Image from 'next/image'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import {
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Text,
  Flex,
  Box,
  Container,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useColors } from 'utils/colors'
import { useQuery, gql } from '@apollo/client'
import { getStatusLabel } from 'utils/helpers'

const MY_LISTINGS = gql`
  query creatorDashboardListings {
    creatorDashboardListings {
      id
      iconUrl
      platform
      deliverable
      status
      brand {
        id
      }
      highestOffer
      offerCount
      finalPrice
      deliveryStartsAt
      deliveryEndsAt
      auctionEndsAt
      completedAt
    }
  }
`

interface Props {
  user: User
}

const CreatorDashboard: NextPage<Props> = ({ user }: Props) => {
  const [listings, setListings] = useState([])
  const { gray } = useColors()
  const { data } = useQuery(MY_LISTINGS, {
    fetchPolicy: 'no-cache',
  })
  console.log('offesr: ', listings)
  useEffect(() => {
    if (data) {
      setListings(data.creatorDashboardListings)
    }
  }, [data])

  return (
    <Layout user={user}>
      <Container>
        <Flex my={9} justify="space-between" align="center">
          <Text textStyle={['h4', 'h2']}>my listings</Text>
          <LinkButton href="/create" size="sm">
            Create New
          </LinkButton>
        </Flex>
        <SimpleGrid columns={[1, null, 2, null, 3]} spacing={7}>
          {listings.map(listing => (
            <AspectRatio key={listing.id} ratio={368 / 242}>
              <LinkBox
                borderRadius="lg"
                bgColor={gray[0]}
                p={4}
                overflow="hidden"
                boxShadow="md"
              >
                <Flex justify="space-between" width="100%" height="100%">
                  <Box>{getStatusLabel(listing)}</Box>
                  <Box>yo</Box>
                </Flex>
                <NextLink href={`/listing/${listing.id}`} passHref>
                  <LinkOverlay>
                    <AspectRatio
                      ratio={1}
                      width="67%"
                      position="absolute"
                      bottom="-45%"
                      left="-25%"
                    >
                      <Image layout="fill" src={listing.iconUrl} />
                    </AspectRatio>
                  </LinkOverlay>
                </NextLink>
              </LinkBox>
            </AspectRatio>
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default CreatorDashboard
