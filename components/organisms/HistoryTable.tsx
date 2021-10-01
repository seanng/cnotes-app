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
import { Offer, User } from 'shared/types'

const columns = ['Creator', 'Deliverable', 'Date Completed']

type Props = {
  user: User
  data: Offer[]
}

const HistoryTable: FC<Props> = ({ data, user }: Props) => {
  const offers = useMemo(() => {
    return data.filter(
      ({ listing }) =>
        listing.brand &&
        listing.brand.id === user.id &&
        listing.status === COMPLETED
    )
  }, [data])
  if (!offers || offers.length === 0) {
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
        {offers.map(({ listing }) => (
          <LinkBox as={Tr} key={listing.id}>
            <Td>
              <NextLink href={`/listing/${listing.id}`} passHref>
                <LinkOverlay>
                  <Flex align="center">
                    <Avatar
                      name={listing.creator.alias}
                      src={listing.creator.avatarUrl}
                    />
                    <Flex direction="column" ml={CREATOR_AVATAR_TEXT_SPACING}>
                      <Box>{listing.creator.alias}</Box>
                      {/* <Box textStyle="mini">10k viewers</Box> */}
                    </Flex>
                  </Flex>
                </LinkOverlay>
              </NextLink>
            </Td>
            <Td>
              <Flex direction="column">
                <Box>{listing.deliverable}</Box>
                <Box textStyle="mini">{listing.platform}</Box>
              </Flex>
            </Td>
            <Td>{format(new Date(listing.completedAt), 'P')}</Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default HistoryTable
