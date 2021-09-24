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
import { COMPLETED, CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { format } from 'date-fns'
import { FC, useMemo } from 'react'
import { Bid, User } from 'shared/types'

const columns = [
  'Creator',
  'Deliverable',
  'Offer Size',
  'Activation Range',
  'Date Completed',
]

type Props = {
  user: User
  data: Bid[]
}

const HistoryTable: FC<Props> = ({ data, user }: Props) => {
  const bids = useMemo(() => {
    return data.filter(
      ({ offer }) =>
        offer.brand && offer.brand.id === user.id && offer.status === COMPLETED
    )
  }, [data])
  if (!bids || bids.length === 0) {
    return (
      <Box textStyle="xLarge">
        You haven&apos;t completed any transactions yet.
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
            <Td>{format(new Date(offer.completedAt), 'P')}</Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default HistoryTable
