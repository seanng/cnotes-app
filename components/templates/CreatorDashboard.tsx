import { NextPage } from 'next'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import {
  Skeleton,
  AspectRatio,
  Text,
  Flex,
  Container,
  SimpleGrid,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import CreatorDashboardCard from 'components/molecules/CreatorDashboardCard'
import { ACTIVE, COMPLETED } from 'shared/constants'
import { CARD_ASPECT_RATIO } from 'shared/metrics'

const MY_LISTINGS = gql`
  query creatorDashboardListings {
    creatorDashboardListings {
      id
      name
      iconUrl
      platform
      deliverable
      status
      offers {
        brand {
          alias
          avatarUrl
        }
      }
      deals {
        id
        status
        brand {
          alias
          avatarUrl
        }
        createdAt
      }
      highestOfferValue
      auctionEndsAt
      decidedAt
      createdAt
    }
  }
`

const LoadingSkeletonCard = () => (
  <AspectRatio ratio={CARD_ASPECT_RATIO}>
    <Skeleton borderRadius="xl" />
  </AspectRatio>
)

interface Props {
  user: User
}

const CreatorDashboard: NextPage<Props> = ({ user }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState([])
  const { data } = useQuery(MY_LISTINGS, {
    fetchPolicy: 'no-cache',
  })
  useEffect(() => {
    if (data) {
      const result = []
      const listings = data.creatorDashboardListings
      for (const listing of listings) {
        if (listing.status === ACTIVE) {
          result.push(listing)
        } else {
          for (const deal of listing.deals) {
            if (deal.status === COMPLETED) {
              // dont show completed deals in dashboard... yet...
              continue
            }
            result.push({
              platform: listing.platform,
              deliverable: listing.deliverable,
              ...deal,
            })
          }
        }
      }
      setCards(result)
      setIsLoading(false)
    }
  }, [data])

  return (
    <Layout user={user}>
      <Container>
        <Flex my={9} justify="space-between" align="center">
          <Text textStyle={['h4', 'h2']}>my dashboard</Text>
          <LinkButton href="/create" size="sm">
            Create New
          </LinkButton>
        </Flex>
        <SimpleGrid columns={[1, null, 2, null, 3, 4]} spacing={7}>
          {isLoading ? (
            <>
              <LoadingSkeletonCard />
              <LoadingSkeletonCard />
              <LoadingSkeletonCard />
            </>
          ) : (
            cards.map(card => (
              <CreatorDashboardCard key={card.id} data={card} />
            ))
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default CreatorDashboard
