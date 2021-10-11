import { Text } from '@chakra-ui/react'
import DealStageBody from 'components/molecules/DealStageBody'
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
        {`Deal ended on ${new Date(deal.submittedAt)}.`}
      </Text>
      <LinkText href={deal.submittedUrl} color={cyan[600]}>
        Click here to view your sponsored video.
      </LinkText>
    </DealStageBody>
  )
}
