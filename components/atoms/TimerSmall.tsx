import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { memo } from 'react'
import { useColors, useTimer } from 'hooks'

interface Props extends FlexProps {
  start?: string
  end: string
}

function TimerSmall({ start, end }: Props): JSX.Element {
  const { DD, HH, MM, SS, isSameDay, isComplete } = useTimer(start, end)
  const { red, gray, yellow } = useColors()

  const display = {
    textStyle: 'tdBold',
    borderRadius: '4px',
    ...(!isComplete && isSameDay && { color: red[500] }),
    ...(isComplete && { color: yellow[700] }),
  }

  const label = {
    textStyle: 'tdMicro',
    color: gray[500],
  }

  return (
    <Flex>
      {!isSameDay && (
        <Box mr="10px">
          <Box {...display}>{DD}</Box>
          <Box {...label}>DD</Box>
        </Box>
      )}
      <Box mr="10px">
        <Box {...display}>{HH}</Box>
        <Box {...label}>HH</Box>
      </Box>
      <Box mr="10px">
        <Box {...display}>{MM}</Box>
        <Box {...label}>MM</Box>
      </Box>
      {isSameDay && (
        <Box>
          <Box {...display}>{SS}</Box>
          <Box pl="2px" {...label}>
            SS
          </Box>
        </Box>
      )}
    </Flex>
  )
}

export default memo(TimerSmall)
