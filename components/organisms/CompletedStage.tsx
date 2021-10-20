import { Text } from '@chakra-ui/react'
import DealStageBody from 'components/molecules/DealStageBody'
import { format } from 'date-fns'
import { Deal } from 'shared/types'
import LinkText from 'components/atoms/LinkText'
import { useColors } from 'hooks'

interface Props {
  deal: Deal
}

export default function CompletedStage({ deal }: Props): JSX.Element {
  const { cyan } = useColors()
  return (
    <DealStageBody deal={deal}>
      <Text textStyle="base" mb={4}>
        {`Deal ended on ${format(new Date(deal.paidAt), 'dd MMMM')}.`}
      </Text>
      <LinkText href={deal.submittedUrl} color={cyan[600]}>
        View your sponsored video.
      </LinkText>
    </DealStageBody>
  )
}
