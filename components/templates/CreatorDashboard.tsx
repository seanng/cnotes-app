import { NextPage } from 'next'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { Container } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'

const MY_OFFERS = gql`
  query creatorDashboardOffers {
    creatorDashboardOffers {
      id
      platform
      deliverable
      status
      brand {
        id
      }
      highestBid
      bidCount
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
  const [offers, setOffers] = useState([])
  const { data } = useQuery(MY_OFFERS, {
    fetchPolicy: 'no-cache',
  })
  console.log('offers: ', offers)
  useEffect(() => {
    if (data) {
      setOffers(data.creatorDashboardOffers)
    }
  }, [data])

  return (
    <Layout user={user}>
      <Container>This appears if the user is verified</Container>
    </Layout>
  )
}

export default CreatorDashboard
