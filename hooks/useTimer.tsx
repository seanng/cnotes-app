import { useEffect, useState } from 'react'
import { calculateTimeLeft } from 'utils/helpers'

const format = num => (num > 9 ? num : `0${num}`)

export const useTimer = (start, end) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(start, end))
  const isComplete = timeLeft.hours === undefined
  const isSameDay = timeLeft.days < 1 || isComplete

  useEffect(() => {
    let timer
    if (!isComplete) {
      timer = setTimeout(
        () => {
          setTimeLeft(calculateTimeLeft(start, end))
        },
        isSameDay ? 1000 : 60000
      )
    }
    return () => clearTimeout(timer)
  })

  return {
    DD: format(timeLeft.days ?? 0),
    HH: format(timeLeft.hours ?? 0),
    MM: format(timeLeft.minutes ?? 0),
    SS: format(timeLeft.seconds ?? 0),
    isComplete,
    isSameDay,
  }
}
