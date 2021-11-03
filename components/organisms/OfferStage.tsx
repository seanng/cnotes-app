import { Listing } from 'shared/types'
import { Container, Text, Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import StageHeading from 'components/molecules/StageHeading'
import { useColors } from 'hooks'
import { lightFormat, formatDistanceToNowStrict } from 'date-fns'
import { Activity } from 'shared/types'
import OfferDetailsCard from 'components/molecules/OfferDetailsCard'
import LinkButton from 'components/atoms/LinkButton'

type Props = {
  listing: Listing
}

const getDayTitle = (date: Date): string => {
  const titles = {
    '0 days': 'Today',
    '1 day': 'Yesterday',
  }
  const numberOfDays = formatDistanceToNowStrict(date, {
    unit: 'day',
    addSuffix: false,
  })
  return titles[numberOfDays] || `${numberOfDays} ago`
}

export default function OfferStage({ listing }: Props): JSX.Element {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    const histories = listing.offers.reduce((prev, curr, idx) => {
      const history = curr.history.map((hist, i) => ({
        ...hist,
        brand: curr.brand,
        isNew: curr.history.length - 1 === i,
        idx,
      }))
      return prev.concat(history)
    }, [])

    const sortedHistories = histories.sort(
      (a, b) =>
        new Date(b.createdAtString).getTime() -
        new Date(a.createdAtString).getTime()
    )

    const groupedHistories = sortedHistories.reduce((prev, curr, idx) => {
      const day = new Date(curr.createdAtString).getDate()
      if (idx === 0) {
        return [{ day, activities: [curr] }]
      }
      const retVal = [...prev]
      const lastItem = retVal[retVal.length - 1]
      if (lastItem.day === day) {
        lastItem.activities.push(curr)
      } else {
        retVal.push({ day, activities: [curr] })
      }
      return retVal
    }, [])

    setTimeline(groupedHistories)
  }, [listing.offers])

  const { gray } = useColors()

  return (
    <>
      <StageHeading data={listing} specs={listing.specs} />
      <Container mt={6}>
        <Text textStyle="h4" mb={5}>
          offer activity
        </Text>
        {timeline.length === 0 && (
          <>
            <Text textStyle="base" mb={8}>
              There are currently no offers.
            </Text>
            <LinkButton size="sm" href="/dashboard">
              Go to Dashboard
            </LinkButton>
          </>
        )}
        {/* TIMELINE GOES HERE */}
        {timeline.map(day => (
          <Box key={day.day} pt={5}>
            <Flex align="center" position="relative" ml={2} pl={4}>
              <Box
                borderWidth="1px"
                borderColor={gray[200]}
                bgColor="transparent"
                position="absolute"
                borderRadius="full"
                left={-1}
                h="10px"
                w="10px"
              />
              <Text textStyle="micro" fontWeight={600} color={gray[500]}>
                {getDayTitle(new Date(day.activities[0].createdAtString))}
              </Text>
            </Flex>
            {day.activities.map((activity: Activity, i) => (
              <Box
                key={activity.idx}
                ml={2}
                pt={i === 0 ? 2 : 6}
                pb={6}
                borderLeftWidth="1px"
                borderLeftColor={gray[100]}
              >
                <Box position="relative" pl={4} mb={5}>
                  <Box
                    bgColor={gray[300]}
                    position="absolute"
                    borderRadius="full"
                    left="-5px"
                    top="7px"
                    h="10px"
                    w="10px"
                  />
                  <Box>
                    <Text
                      textStyle={['small', 'base']}
                      fontWeight={500}
                      mb="2px"
                    >{`${activity.brand.alias} ${
                      activity.isNew ? 'posted an' : 'updated their'
                    } offer`}</Text>
                    <Text textStyle="micro" fontWeight={600} color={gray[500]}>
                      {lightFormat(
                        new Date(activity.createdAtString),
                        'h:mm aaa'
                      )}
                    </Text>
                  </Box>
                </Box>
                <OfferDetailsCard ml={4} activity={activity} />
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </>
  )
}
