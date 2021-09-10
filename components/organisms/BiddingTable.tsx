import {
  Th,
  Table,
  Thead,
  Tbody,
  Avatar,
  Box,
  Flex,
  Td,
  Tr,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import CountdownTimer from 'components/atoms/CountdownTimer'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { FC, useMemo } from 'react'
import BidInput from 'components/molecules/BidInput'
import { Bid, User } from 'shared/types'
import { formatRelative } from 'date-fns'

const columns = [
  'Creator',
  'Deliverable',
  'Time Left',
  'Highest Bid',
  'My Bid',
  '', // Bid Button
]

type Props = {
  data: Bid[]
  user: User
}

// query the data via apollo?
const BiddingTable: FC<Props> = ({ data }: Props) => {
  const now = new Date()
  const bids = useMemo(() => {
    return data.filter(({ offer }) => new Date(offer.auctionEndsAt) > now)
  }, [data])

  return (
    <Table variant="brandDashboard">
      <Thead>
        <Tr>
          {columns.map(col => (
            <Th key={col}>{col}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {bids.map(({ offer, history }) => (
          <LinkBox
            as={Tr}
            transform="scale(1)"
            cursor="pointer"
            key={offer.id}
            _hover={{ shadow: 'md' }}
            textStyle="body2"
          >
            <Td>
              <NextLink href={`/offer/${offer.id}`} passHref>
                <LinkOverlay>
                  <Flex align="center">
                    <Avatar
                      name={offer.creator.alias}
                      src="https://bit.ly/dan-abramov"
                    />
                    <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                      <Box>{offer.creator.alias}</Box>
                      {/* <Box textStyle="caption2">10k viewers</Box> */}
                    </Flex>
                  </Flex>
                </LinkOverlay>
              </NextLink>
            </Td>
            <Td>
              <Flex direction="column">
                <Box>{offer.deliverable}</Box>
                <Box textStyle="caption2">{offer.platform}</Box>
              </Flex>
            </Td>
            <Td>
              <Flex direction="column" minWidth={208}>
                <CountdownTimer end={offer.auctionEndsAt} />
                <Box textStyle="caption2">
                  {`Ends ${formatRelative(new Date(offer.auctionEndsAt), now)}`}
                </Box>
              </Flex>
            </Td>
            <Td>
              <Flex direction="column">
                <Box>${offer.highestBid.toLocaleString()}</Box>
                <Box textStyle="caption2">{offer.bidCount} bids</Box>
              </Flex>
            </Td>
            <Td>${history[history.length - 1].price.toLocaleString()}</Td>
            <Td pr={0} textAlign="right">
              <BidInput offer={offer} />
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default BiddingTable
