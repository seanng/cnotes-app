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
import { Offer, User } from 'shared/types'
import { useMutation, gql } from '@apollo/client'
import { MouseEventHandler, FC, useMemo } from 'react'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'

const UPDATE_BID = gql`
  mutation updateOffer($input: UpdateOfferInput!) {
    updateOffer(input: $input) {
      id
      isCleared
    }
  }
`

const columns = [
  'Creator',
  'Deliverable',
  'Highest Offer',
  'My Offer',
  'Status',
  '', // Clear Button
]

type Props = {
  data: Offer[]
  user: User
}

const AwaitingTable: FC<Props> = ({ data }: Props) => {
  const now = new Date()
  const [updateOffer] = useMutation(UPDATE_BID)

  const offers = useMemo(() => {
    return data
      .filter(
        ({ listing, isCleared }) =>
          now > new Date(listing.auctionEndsAt) && !isCleared
      )
      .map(offer => ({
        ...offer,
        status: offer.listing.status,
      }))
  }, [data])

  const handleClearClick =
    (id: string): MouseEventHandler =>
    async (): Promise<void> => {
      await updateOffer({
        variables: {
          input: {
            id,
            isCleared: true,
          },
        },
      })
    }

  if (!offers || offers.length === 0) {
    return (
      <Box textStyle="xLarge">
        There are currently no listings that are pending.
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
        {offers.map(({ id, listing, status, history }) => (
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
            <Td>${listing.highestOfferValue.toLocaleString()}</Td>
            <Td>${history[history.length - 1].cashValue.toLocaleString()}</Td>
            <Td>
              <ListingStatusBadge status={status} />
            </Td>
            <Td pl={-2} textAlign="right" maxWidth={50}>
              {/* {status !== 'SELECTING' && ( */}
              <IconButton
                size="xs"
                type="submit"
                aria-label="Offer"
                colorScheme="red"
                onClick={handleClearClick(id)}
                icon={<CloseIcon boxSize={2} />}
              />
              {/* )} */}
            </Td>
          </LinkBox>
        ))}
      </Tbody>
    </Table>
  )
}

export default AwaitingTable
