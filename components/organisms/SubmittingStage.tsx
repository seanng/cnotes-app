import { Text } from '@chakra-ui/react'
import DealStageBody from 'components/molecules/DealStageBody'

export default function SubmittingStage({ deal }): JSX.Element {
  return (
    <DealStageBody deal={deal}>
      <Text>look out for bla bla bla</Text>
    </DealStageBody>
  )
}
