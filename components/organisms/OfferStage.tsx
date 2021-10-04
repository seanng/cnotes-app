import dynamic from 'next/dynamic'
import Image from 'next/image'
import { Listing } from 'shared/types'
import {
  Container,
  Avatar,
  Divider,
  Center,
  Text,
  Box,
  Tag,
  Flex,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useColors } from 'utils/colors'
import { lightFormat, formatDistanceToNowStrict } from 'date-fns'

const CountdownTimerLabel = dynamic(
  () => import('components/atoms/CountdownTimerLabel'),
  { ssr: false }
)

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

  const { gray, cyan } = useColors()

  return (
    <>
      <Container mt={4} mb={6}>
        <CountdownTimerLabel
          borderRadius="full"
          end={listing.auctionEndsAt}
          mb={7}
        />
        <Flex align="flex-start">
          <Center bgColor={gray[0]} borderRadius="full" p={4} mr={4}>
            <Image
              src={listing.iconUrl}
              layout="fixed"
              width={40}
              height={40}
            />
          </Center>
          <Box>
            <Tag bgColor="yellow.400" color="black" variant="card">
              listed
            </Tag>
            <Text textStyle="h4" mt={1}>
              {listing.name}
            </Text>
          </Box>
        </Flex>
      </Container>
      <Divider />
      <Container mt={6}>
        <Text textStyle="h4" mb={5}>
          offer activity
        </Text>
        {/* TIMELINE GOES HERE */}
        {timeline.map(day => (
          <Box key={day.day} pt={5}>
            <Flex align="center" position="relative" ml={2} pl={4}>
              <Box
                borderWidth="1px"
                borderColor={gray[500]}
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
            {day.activities.map((activity, i) => (
              <Box
                key={activity.idx}
                ml={2}
                pt={i === 0 ? 2 : 6}
                pb={6}
                borderLeftWidth="1px"
                borderLeftColor="gray.500"
              >
                <Box position="relative" pl={4} mb={5}>
                  <Box
                    bgColor={gray[500]}
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
                <Flex
                  borderRadius="xl"
                  bgColor={gray[0]}
                  boxShadow="sm"
                  maxWidth={662}
                  ml={4}
                  p={5}
                >
                  <Avatar size="xl" src={activity.brand.avatarUrl} mr={5} />
                  <Box>
                    <Text textStyle={['base', 'large']} fontWeight={700} mb={2}>
                      {/* TODO: change to total value */}
                      {`$${activity.price}`}
                    </Text>
                    <Text textStyle={['micro', 'mini']} mb={2}>
                      {activity.price > 0 && `💰$${activity.price} + `}
                      <Box as="span" color={cyan[600]}>
                        🎁WH-1000MX4 Wireless noise cancelling headphones ($200)
                      </Box>
                    </Text>
                    <Text textStyle={['mini', 'small']} color={gray[500]}>
                      {`"${activity.message}"`}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))}
          </Box>
        ))}
      </Container>
    </>
  )
}
