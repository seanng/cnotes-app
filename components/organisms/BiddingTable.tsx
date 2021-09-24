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
import { FC, useMemo, useState } from 'react'
import BidInput from 'components/molecules/BidInput'
import BidModal from 'components/molecules/BidModal'
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
  const [modalDefaultValues, setModalDefaultValues] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [price, setPrice] = useState(0)
  const [selectedOffer, setSelectedOffer] = useState(null)

  const handleBidEnter =
    bid =>
    ({ input }: { input: number }): void => {
      setSelectedOffer(bid.offer)
      setPrice(input)
      setModalDefaultValues({
        message: bid.message,
        productUrl: bid.productUrl,
      })
      setIsModalOpen(true)
    }

  const now = new Date()
  const bids = useMemo(() => {
    return data.filter(({ offer }) => new Date(offer.auctionEndsAt) > now)
  }, [data])

  if (!bids || bids.length === 0) {
    return <Box textStyle="xLarge">There are no ongoing bids at the moment</Box>
  }

  return (
    <>
      <Table variant="brandDashboard">
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th key={col}>{col}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {bids.map(bid => {
            const { offer, history } = bid
            const currentBidPrice = history[history.length - 1].price
            return (
              <LinkBox as={Tr} key={offer.id}>
                <Td>
                  <NextLink href={`/offer/${offer.id}`} passHref>
                    <LinkOverlay>
                      <Flex align="center">
                        <Avatar
                          name={offer.creator.alias}
                          src={offer.creator.avatarUrl}
                        />
                        <Flex
                          direction="column"
                          ml={CREATOR_AVATAR_TEXT_SPACING}
                        >
                          <Box>{offer.creator.alias}</Box>
                          {/* <Box textStyle="mini">10k viewers</Box> */}
                        </Flex>
                      </Flex>
                    </LinkOverlay>
                  </NextLink>
                </Td>
                <Td>
                  <Flex direction="column">
                    <Box>{offer.deliverable}</Box>
                    <Box textStyle="mini">{offer.platform}</Box>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="column" minWidth={208}>
                    <CountdownTimer end={offer.auctionEndsAt} />
                    <Box textStyle="mini">
                      {`Ends ${formatRelative(
                        new Date(offer.auctionEndsAt),
                        now
                      )}`}
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="column">
                    <Box>${offer.highestBid.toLocaleString()}</Box>
                    <Box textStyle="mini">{offer.bidCount} bids</Box>
                  </Flex>
                </Td>
                <Td>${currentBidPrice.toLocaleString()}</Td>
                <Td pr={0} textAlign="right">
                  <BidInput
                    minBid={currentBidPrice}
                    onSubmit={handleBidEnter(bid)}
                  />
                </Td>
              </LinkBox>
            )
          })}
        </Tbody>
      </Table>
      <BidModal
        offer={selectedOffer}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        isOpen={isModalOpen}
        price={price}
        defaultValues={modalDefaultValues}
      />
    </>
  )
}

export default BiddingTable
