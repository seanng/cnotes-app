import NextLink from 'next/link'
import { useQuery, gql } from '@apollo/client'
import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Offer } from 'shared/types'
import {
  Th,
  Table,
  Button,
  Text,
  Thead,
  Tbody,
  LinkBox,
  LinkOverlay,
  Box,
  Avatar,
  Flex,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useColors } from 'hooks'
import { STATUS, ACTIVE, AWAITING } from 'shared/constants'
import TableLoadingSkeleton from 'components/molecules/TableLoadingSkeleton'
import EmptyTableState from 'components/molecules/EmptyTableState'
import OfferModal from 'components/molecules/OfferModal'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
import Helptip from 'components/atoms/Helptip'
import LinkButton from 'components/atoms/LinkButton'
import BrandDashOfferValue from 'components/atoms/BrandDashOfferValue'

const TimerSmall = dynamic(() => import('components/atoms/TimerSmall'), {
  ssr: false,
})

const MY_ACTIVE_OFFERS = gql`
  query brandDashOffers {
    brandDashOffers(type: "active") {
      id
      history {
        productUrl
        productName
        cashValue
        productMSRP
        message
        createdAtString
      }
      listing {
        id
        platform
        deliverable
        specs
        status
        highestOfferValue
        auctionEndsAt
        creator {
          slug
          alias
          avatarUrl
        }
        offers {
          id
        }
        decidedAt
      }
    }
  }
`

const columns = [
  'Creator',
  'Your offer',
  'Highest offer',
  'Time left',
  'Deliverable',
  STATUS,
  '', // Button
]

export default function OffersTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [offers, setOffers] = useState<Offer[]>([])
  const { data } = useQuery(MY_ACTIVE_OFFERS, {
    // fetchPolicy: 'no-cache',
  })
  const { gray } = useColors()

  useEffect(() => {
    if (data?.brandDashOffers) {
      // sort by last offer time
      const sortedOffers = [...data.brandDashOffers].sort((a, b) => {
        const aOfferDate = new Date(
          a.history[a.history.length - 1].createdAtString
        )
        const bOfferDate = new Date(
          b.history[b.history.length - 1].createdAtString
        )
        return aOfferDate.getTime() - bOfferDate.getTime()
      })
      setOffers(sortedOffers)
      if (isLoading) {
        setIsLoading(false)
      }
    }
  }, [data])

  const handleUpdateClick = i => () => {
    setSelectedOffer(offers[i])
    setIsModalOpen(true)
  }

  if (isLoading) {
    return <TableLoadingSkeleton />
  }

  const selectedLastOffer =
    selectedOffer?.history[selectedOffer.history.length - 1]

  // handle empty state.
  return offers.length === 0 ? (
    <EmptyTableState
      heading="Start by making your first offer!"
      body="Making an offer will bring you a step closer towards working with your preferred creators."
    />
  ) : (
    <>
      <Table variant="brandDashboard">
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th key={col}>
                {col === STATUS ? (
                  <Flex align="flex-end">
                    {col}
                    <Helptip
                      label={
                        <Box textStyle="micro">
                          <Flex>
                            <Box as="span" color="cyan.500">
                              ACTIVE
                            </Box>
                            <span>
                              : Creator is accepting offers and updates
                            </span>
                          </Flex>
                          <Flex>
                            <Box as="span" color="yellow.400">
                              AWAITING
                            </Box>
                            <span>: Creator is selecting who to work with</span>
                          </Flex>
                        </Box>
                      }
                      hasArrow
                      placement="top"
                    />
                  </Flex>
                ) : (
                  col
                )}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {offers.map((offer, i) => {
            const { listing, history } = offer
            const lastOffer = history[history.length - 1]
            const status =
              new Date() < new Date(listing.auctionEndsAt) ? ACTIVE : AWAITING
            return (
              <Tr key={listing.id}>
                <Td
                  {...(i === 0 && { borderTopLeftRadius: 'lg' })}
                  {...(i === offers.length - 1 && {
                    borderBottomLeftRadius: 'lg',
                  })}
                >
                  <LinkBox
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Avatar
                      name={listing.creator.alias}
                      src={listing.creator.avatarUrl}
                      size="sm"
                    />
                    <Flex direction="column" ml={2}>
                      <Text textStyle="largeBold">{listing.creator.alias}</Text>
                    </Flex>
                    <NextLink href={`/listing/${listing.id}`} passHref>
                      <LinkOverlay isExternal />
                    </NextLink>
                  </LinkBox>
                </Td>
                <Td minWidth={150}>
                  <BrandDashOfferValue offer={lastOffer} />
                  <Text textStyle="microBold" color={gray[500]}>
                    {`${formatDistanceToNow(
                      new Date(lastOffer.createdAtString)
                    )} ago`}
                  </Text>
                </Td>
                <Td minWidth={150}>
                  <Text textStyle="largeBold">
                    ${listing.highestOfferValue.toLocaleString()}
                  </Text>
                  <Text textStyle="microBold" color={gray[500]}>
                    {`${listing.offers.length} total offers`}
                  </Text>
                </Td>
                <Td>
                  <TimerSmall end={listing.auctionEndsAt} />
                </Td>
                <Td>
                  <Text textStyle="largeBold" textTransform="capitalize">
                    {listing.deliverable}
                  </Text>
                  <Text textStyle="microBold" color={gray[500]}>
                    {listing.platform}
                  </Text>
                </Td>
                <Td
                  {...(i === 0 && { borderTopRightRadius: 'lg' })}
                  {...(i === offers.length - 1 && {
                    borderBottomRightRadius: 'lg',
                  })}
                >
                  <ListingStatusBadge status={status} />
                </Td>
                <Td bgColor="transparent">
                  {status === ACTIVE ? (
                    <Button size="table" onClick={handleUpdateClick(i)}>
                      Update
                    </Button>
                  ) : (
                    <LinkButton
                      size="table"
                      variant="outline"
                      href={`/listing/${listing.id}`}
                    >
                      View
                    </LinkButton>
                  )}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      <OfferModal
        isUpdate
        listing={selectedOffer?.listing}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        isOpen={isModalOpen}
        defaultValues={{
          message: selectedLastOffer?.message,
          productUrl: selectedLastOffer?.productUrl,
          productName: selectedLastOffer?.productName,
          productMSRP: selectedLastOffer?.productMSRP || 0,
          cashValue: selectedLastOffer?.cashValue || 0,
        }}
      />
    </>
  )
}
