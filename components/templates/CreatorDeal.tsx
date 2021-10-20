import { gql, useQuery } from '@apollo/client'
import { useEffect, useState, FC } from 'react'
import { Deal, User } from 'shared/types'
import CreatorListingSkeleton from 'components/molecules/CreatorListingSkeleton'
import NotFound from 'components/organisms/404'
import { COMPLETED, PAYING, SUBMITTING } from 'shared/constants'
import Layout from 'components/organisms/Layout'
import { NextPage } from 'next'
import SubmittingStage from 'components/organisms/SubmittingStage'
import PayingStage from 'components/organisms/PayingStage'
import CompletedStage from 'components/organisms/CompletedStage'

const DEAL_BY_ID = gql`
  query dealById($id: ID) {
    dealById(id: $id) {
      id
      status
      productUrl
      productName
      productValue
      cashValue
      submittedUrl
      message
      listing {
        platform
        description
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
      submittedAt
      paidAt
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
  [COMPLETED]: CompletedStage,
}

function getComponent(loading, deal: Deal | null): FC<{ deal: Deal }> {
  if (loading) return CreatorListingSkeleton
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
