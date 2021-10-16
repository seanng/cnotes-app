import { memo } from 'react'
import { Text, FlexProps } from '@chakra-ui/react'
import { useTimer } from 'hooks'

interface Props extends FlexProps {
  start?: string
  end: string
}

function TimerText({ start, end }: Props): JSX.Element {
  const { DD, HH, MM, SS, isSameDay, isComplete } = useTimer(start, end)

  return (
    <Text textStyle="largeBold" color={isComplete ? 'red.300' : 'green.400'}>
      {!isSameDay && `${DD}d `}
      {`${HH}h `}
      {`${MM}m `}
      {isSameDay && `${SS}s`}
    </Text>
  )
}
export default memo(TimerText)
