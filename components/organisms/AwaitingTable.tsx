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
  IconButton,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { CloseIcon } from '@chakra-ui/icons'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { Bid, User } from 'shared/types'
import { useMutation, gql } from '@apollo/client'
import { MouseEventHandler, FC, useMemo } from 'react'
import OfferStatusBadge from 'components/atoms/OfferStatusBadge'

const UpdateBidMutation = gql`
  mutation UpdateBidMutation($input: UpdateBidInput!) {
    updateBid(input: $input) {
      id
      isCleared
    }
  }
`

const columns = [
  'Creator',
  'Deliverable',
  'Highest Bid',
  'My Bid',
  'Status',
  '', // Clear Button
]

type Props = {
  data: Bid[]
  user: User
}

const getBidStatus = (bid: Bid, user: User): string => {
  if (!bid.offer.brand) {
    return 'SELECTING'
  } else if (bid.offer.brand.id !== user.id) {
    return 'LOST'
  }
  return 'WON'
}

const AwaitingTable: FC<Props> = ({ data, user }: Props) => {
  const now = new Date()
  const [updateBid] = useMutation(UpdateBidMutation)

  const bids = useMemo(() => {
    return data
      .filter(
        ({ offer, isCleared }) =>
          now > new Date(offer.auctionEndsAt) && !isCleared
      )
      .map(bid => ({
        ...bid,
        status: getBidStatus(bid, user),
      }))
  }, [data])

  const handleClearClick =
    (id: string): MouseEventHandler =>
    async (): Promise<void> => {
      await updateBid({
        variables: {
          input: {
            id,
            isCleared: true,
          },
        },
      })
    }

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
        {bids.map(({ id, offer, status, history }) => (
          <LinkBox
            as={Tr}
            transform="scale(1)"
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            textStyle="body2"
            key={offer.id}
          >
            <Td>
              <NextLink href={`/offer/${offer.id}`} passHref>
                <LinkOverlay>
                  <Flex align="center">
                    <Avatar
                      name={offer.creator.alias}
                      src={offer.creator.avatarUrl}
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
            <Td>${offer.highestBid.toLocaleString()}</Td>
            <Td>${history[history.length - 1].price.toLocaleString()}</Td>
            <Td>
              <OfferStatusBadge status={status} />
            </Td>
            <Td pl={-2} textAlign="right" maxWidth={50}>
              {status !== 'SELECTING' && (
                <IconButton
                  size="xs"
                  type="submit"
                  aria-label="Bid"
                  bgColor="red"
                  onClick={handleClearClick(id)}
                  icon={<CloseIcon boxSize={2} />}
                />
              )}
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default AwaitingTable
