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
  Button,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import OfferStatusBadge from 'components/atoms/OfferStatusBadge'
import {
  CREATOR_AVATAR_TEXT_SPACING,
  COMPLETED,
  PAYING,
} from 'shared/constants'
import { MouseEventHandler, FC, useMemo } from 'react'
import { format } from 'date-fns'
import { Bid, User } from 'shared/types'

const columns = [
  'Creator',
  'Deliverable',
  'Offer Size',
  'Activation Range',
  'Status',
  '', // Mark As Paid Button
]

type Props = {
  data: Bid[]
  user: User
}

const WonTable: FC<Props> = ({ data, user }: Props) => {
  const bids = useMemo(() => {
    return data.filter(
      ({ offer }) =>
        offer.brand && offer.brand.id === user.id && offer.status !== COMPLETED
    )
  }, [data])
  const handleClick: MouseEventHandler = () => {
    // return input
    // input should be a number
  }
  if (!bids || bids.length === 0) {
    return (
      <Box textStyle="xLarge">
        You don&apos;t have any ongoing transactions.
      </Box>
    )
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
        {bids.map(({ offer }) => (
          <LinkBox as={Tr} key={offer.id}>
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
            <Td>${offer.finalPrice}</Td>
            <Td>{`${format(new Date(offer.deliveryStartsAt), 'P')} - ${format(
              new Date(offer.deliveryEndsAt),
              'P'
            )}`}</Td>
            <Td>
              <OfferStatusBadge status={offer.status} />
            </Td>
            <Td pr={0}>
              {offer.status === PAYING && (
                <Button
                  type="button"
                  aria-label="Paid"
                  size="sm"
                  onClick={handleClick}
                >
                  I have paid
                </Button>
              )}
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default WonTable
