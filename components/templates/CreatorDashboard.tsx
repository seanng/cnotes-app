import { NextPage } from 'next'
import LinkButton from 'components/atoms/LinkButton'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { Text, Flex, Container, SimpleGrid } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import CreatorDashboardCard from 'components/molecules/CreatorDashboardCard'

const MY_LISTINGS = gql`
  query creatorDashboardListings {
    creatorDashboardListings {
      id
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
      highestOffer
      offerCount
      auctionEndsAt
      completedAt
      createdAt
    }
  }
`

interface Props {
  user: User
}

const CreatorDashboard: NextPage<Props> = ({ user }: Props) => {
  const [listings, setListings] = useState([])
  const { data } = useQuery(MY_LISTINGS, {
    fetchPolicy: 'no-cache',
  })
  // console.log('offesr: ', listings)
  useEffect(() => {
    if (data) {
      setListings(data.creatorDashboardListings)
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
        <SimpleGrid columns={[1, null, 2, null, 3]} spacing={7}>
          {listings.map(listing => (
            <CreatorDashboardCard key={listing.id} data={listing} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default CreatorDashboard
