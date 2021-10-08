import { gql, useQuery } from '@apollo/client'
import { useEffect, useState, FC } from 'react'
import { Deal, User } from 'shared/types'
import { Text, Divider, Skeleton, Container, Box } from '@chakra-ui/react'
import { PAYING, SUBMITTING } from 'shared/constants'
import Layout from 'components/organisms/Layout'
import { NextPage } from 'next'
import SubmittingStage from 'components/organisms/SubmittingStage'
import PayingStage from 'components/organisms/PayingStage'

const DEAL_BY_ID = gql`
  query dealById($id: ID) {
    dealById(id: $id) {
      id
      status
      productUrl
      productName
      productValue
      cashValue
      message
      listing {
        platform
        deliverable
        specs
      }
      brand {
        id
        slug
        alias
        avatarUrl
      }
      createdAt
    }
  }
`

interface Props {
  user: User
  dealId: string
}

const components = {
  [SUBMITTING]: SubmittingStage,
  [PAYING]: PayingStage,
}

const Loading = () => (
  <>
    <Container mt={4} mb={[6, 10]}>
      <Skeleton w="300px" height="160px" />
    </Container>
    <Divider />
    <Container mt={6}>
      <Skeleton mb={5} w="150px">
        <Text textStyle="h4">yo</Text>
      </Skeleton>
      <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
      <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
      <Skeleton pt={5} w="100%" maxWidth="700px" h="149px" />
    </Container>
  </>
)

const NotFound = () => <Box>Not Found</Box>

function getComponent(loading, deal: Deal | null): FC<{ deal: Deal }> {
  if (loading) return Loading
  if (!deal || !deal.status) return NotFound

  return components[deal.status]
}

const CreatorDeal: NextPage<Props> = ({ user, dealId }: Props) => {
  const [deal, setDeal] = useState<Deal | null>(null)

  const { data, loading } = useQuery(DEAL_BY_ID, {
    variables: { id: dealId },
  })

  useEffect(() => {
    if (data && data.dealById) {
      setDeal(data.dealById)
    }
  }, [data])

  const Component = getComponent(loading, deal)

  return (
    <Layout user={user}>
      <Component deal={deal} />
    </Layout>
  )
}

export default CreatorDeal