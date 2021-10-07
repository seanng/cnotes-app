import { Text, Button } from '@chakra-ui/react'
import DealStageBody from 'components/molecules/DealStageBody'
import { COMPLETED } from 'shared/constants'
import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Deal } from 'shared/types'

const UPDATE_DEAL = gql`
  mutation updateDeal($id: ID!, $payload: UpdateDealInput!) {
    updateDeal(id: $id, payload: $payload) {
      id
      status
      submittedUrl
      submittedAt
    }
  }
`

interface Props {
  deal: Deal
}

export default function PayingStage({ deal }: Props): JSX.Element {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateDeal] = useMutation(UPDATE_DEAL)

  const handleClick = async (): Promise<void> => {
    setIsUpdating
    await updateDeal({
      variables: { id: deal.id, payload: { status: COMPLETED } },
    })
  }

  return (
    <DealStageBody deal={deal}>
      <Text textStyle="base" mb={4}>
        Thanks for your submission! Please connect with your brand partner for
        payment.
      </Text>
      <Text textStyle="base" mb={8}>
        Once you’ve received your funds, click this button to verify and close
        the contract.
      </Text>
      <Button onClick={handleClick} disabled={isUpdating}>
        I&apos;ve received my payment
      </Button>
    </DealStageBody>
  )
}
