import { Box, Flex, FlexProps } from '@chakra-ui/react'
import { memo, useEffect, useState } from 'react'
import { calculateTimeLeft } from 'utils/helpers'

interface Props extends FlexProps {
  start?: string
  end: string
}

const format = num => (num > 9 ? num : `0${num}`)

function CountdownTimerLabel({ start, end, ...props }: Props): JSX.Element {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(start, end))
  const isCountdownComplete = timeLeft.hours === undefined
  const isWithin24Hours = timeLeft.days < 1 || isCountdownComplete
  useEffect(() => {
    if (!isCountdownComplete) {
      setTimeout(
        () => {
          setTimeLeft(calculateTimeLeft(start, end))
        },
        isWithin24Hours ? 1000 : 60000
      )
    }
  })

  const DD = format(timeLeft.days ?? 0)
  const HH = format(timeLeft.hours ?? 0)
  const MM = format(timeLeft.minutes ?? 0)
  const SS = format(timeLeft.seconds ?? 0)

  const clockEmoji = !isWithin24Hours ? '🕕' : isCountdownComplete ? '🕛' : '🕙'

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
        <Box
          color={isWithin24Hours && !isCountdownComplete ? 'cyan.500' : 'white'}
          fontFamily="digital"
        >
          {isWithin24Hours ? `${HH}:${MM}:${SS}` : `${DD}:${HH}:${MM}`}
        </Box>
        <Box
          fontSize="8px"
          textStyle="nano"
          color={
            isWithin24Hours && !isCountdownComplete ? 'cyan.500' : 'gray.200'
          }
        >
          {!isWithin24Hours && (
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
          {isWithin24Hours && (
            <Box as="span" mr={2}>
              Seconds
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default memo(CountdownTimerLabel)
