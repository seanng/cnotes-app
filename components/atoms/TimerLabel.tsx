import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { memo } from 'react'
import { useTimer } from 'hooks'

interface Props extends FlexProps {
  start?: string
  end: string
}

function TimerLabel({ start, end, ...props }: Props): JSX.Element {
  const { DD, HH, MM, SS, isComplete, isSameDay } = useTimer(start, end)

  const clockEmoji = !isSameDay ? '🕕' : isComplete ? '🕛' : '🕙'

  return (
    <Flex
      align="center"
      bgColor="gray.800"
      display="inline-flex"
      fontSize={24}
      pl={4}
      pr={4}
      py={1}
      {...props}
    >
      <Box mr={3}>{clockEmoji}</Box>
      <Box>
        <Box color={isSameDay ? 'cyan.500' : 'white'} fontFamily="digital">
          {isSameDay ? `${HH}:${MM}:${SS}` : `${DD}:${HH}:${MM}`}
        </Box>
        <Box fontSize="8px" textStyle="nano" color={'gray.200'}>
          {!isSameDay && (
            <Box as="span" ml={1} mr={4}>
              Days
            </Box>
          )}
          <Box as="span" mr={3}>
            Hours
          </Box>
          <Box as="span" mr={2}>
            Minutes
          </Box>
          {isSameDay && (
            <Box as="span" mr={2}>
              Seconds
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default memo(TimerLabel)
