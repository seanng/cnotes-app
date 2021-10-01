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
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
import {
  CREATOR_AVATAR_TEXT_SPACING,
  COMPLETED,
  // PAYING,
} from 'shared/constants'
import { MouseEventHandler, FC, useMemo } from 'react'
import { Offer, User } from 'shared/types'

const columns = [
  'Creator',
  'Deliverable',
  'Status',
  '', // Mark As Paid Button
]

type Props = {
  data: Offer[]
  user: User
}

const WonTable: FC<Props> = ({ data }: Props) => {
  const offers = useMemo(() => {
    return data.filter(
      ({ listing }) =>
        // listing.brand &&
        // listing.brand.id === user.id &&
        listing.status !== COMPLETED
    )
  }, [data])
  const handleClick: MouseEventHandler = () => {
    // return input
    // input should be a number
  }
  if (!offers || offers.length === 0) {
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
            <Td>
              <ListingStatusBadge status={listing.status} />
            </Td>
            <Td pr={0}>
              {/* TODO: change to deal.status === PAYING && */}
              <Button
                type="button"
                aria-label="Paid"
                size="sm"
                onClick={handleClick}
              >
                I have paid
              </Button>
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default WonTable
