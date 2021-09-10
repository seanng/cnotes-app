/* https://github.com/do-community/react-hooks-timer/blob/master/src/App.js */

import { FC, useEffect, memo, useState } from 'react'
import { BoxProps, Box } from '@chakra-ui/react'

const calculateTimeLeft = (
  start: string | undefined,
  end: string
): Record<string, number> => {
  const startDate = start ? +new Date(start) : +new Date()
  const difference = +new Date(end) - startDate
  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return timeLeft
}

interface Props extends BoxProps {
  start?: string
  end: string
}

const CountdownTimer: FC<Props> = ({ start, end, ...boxProps }: Props) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(start, end))
  const isSecondsAway = timeLeft.hours < 0 && timeLeft.minutes < 3

  useEffect(() => {
    setTimeout(
      () => {
        setTimeLeft(calculateTimeLeft(start, end))
      },
      isSecondsAway ? 1000 : 60000
    )
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval, i) => {
    if (!timeLeft[interval]) {
      return
    }

    const number = timeLeft[interval]
    const intervalDisplay = number > 1 ? interval : interval.slice(0, -1)

    if (isSecondsAway) {
      timerComponents.push(
        <span key={i}>
          {number} {intervalDisplay}{' '}
        </span>
      )
    } else if (interval !== 'seconds') {
      // dont display seconds if > 3 minutes remaining
      timerComponents.push(
        <span key={i}>
          {number} {intervalDisplay}{' '}
        </span>
      )
    }
  })
  return (
    <Box color={isSecondsAway ? 'red' : 'green'} {...boxProps}>
      {timerComponents.length ? timerComponents : <span>Auction Ended</span>}
    </Box>
  )
}

export default memo(CountdownTimer)
