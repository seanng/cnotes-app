import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { memo } from 'react'
import { useColorModeValue } from '@chakra-ui/react'
import { useColors, useTimer } from 'hooks'

interface Props extends FlexProps {
  start?: string
  end: string
}

function TimerSmall({ start, end }: Props): JSX.Element {
  const { DD, HH, MM, SS, isSameDay } = useTimer(start, end)
  const { gray, cyan } = useColors()

  const display = {
    textStyle: 'tdBold',
    px: 1,
    borderRadius: '4px',
    bgColor: useColorModeValue('#D8DADF', '#454954'),
    ...(isSameDay && { color: cyan[700] }),
  }

  const label = {
    textStyle: 'tdMicro',
    color: gray[500],
  }

  return (
    <Flex>
      {!isSameDay && (
        <Box mr={2}>
          <Box {...display}>{DD}</Box>
          <Box {...label}>DD</Box>
        </Box>
      )}
      <Box mr={2}>
        <Box {...display}>{HH}</Box>
        <Box {...label}>HH</Box>
      </Box>
      <Box mr={2}>
        <Box {...display}>{MM}</Box>
        <Box {...label}>MM</Box>
      </Box>
      {isSameDay && (
        <Box>
          <Box {...display}>{SS}</Box>
          <Box {...label}>SS</Box>
        </Box>
      )}
    </Flex>
  )
}

export default memo(TimerSmall)
