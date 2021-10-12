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
  Avatar,
  Flex,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useColors } from 'hooks'
import { ACTIVE, AWAITING } from 'shared/constants'
import TableLoadingSkeleton from 'components/molecules/TableLoadingSkeleton'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
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
        productValue
        message
        createdAtString
      }
      listing {
        id
        platform
        deliverable
        status
        highestOfferValue
        offerCount
        auctionEndsAt
        creator {
          alias
          avatarUrl
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
  'Status',
  '', // Button
]

export default function OffersTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [offers, setOffers] = useState<Offer[]>([])
  const { data } = useQuery(MY_ACTIVE_OFFERS, {
    // fetchPolicy: 'no-cache',
  })
  const { gray } = useColors()

  useEffect(() => {
    if (data && data.brandDashOffers) {
      setIsLoading(true)
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
      setIsLoading(false)
    }
  }, [data])

  const handleUpdateClick = () => {
    console.log('handleUpdateClick: ', handleUpdateClick)
  }

  const handleViewClick = () => {
    console.log('handleViewClick: ', handleViewClick)
  }

  if (isLoading) {
    return <TableLoadingSkeleton />
  }

  // handle empty state.
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
                  <Flex align="center">
                    <Avatar
                      name={listing.creator.alias}
                      src={listing.creator.avatarUrl}
                      size="sm"
                    />
                    <Flex direction="column" ml={2}>
                      <Text textStyle="tdBold">{listing.creator.alias}</Text>
                    </Flex>
                  </Flex>
                </Td>
                <Td>
                  <BrandDashOfferValue offer={lastOffer} />
                  <Text textStyle="tdMicro" color={gray[500]}>
                    {`${formatDistanceToNow(
                      new Date(lastOffer.createdAtString)
                    )} ago`}
                  </Text>
                </Td>
                <Td>
                  <Text textStyle="tdBold">${listing.highestOfferValue}</Text>
                  <Text textStyle="tdMicro" color={gray[500]}>
                    {`${listing.offerCount} total offers`}
                  </Text>
                </Td>
                <Td>
                  <TimerSmall end={listing.auctionEndsAt} />
                </Td>
                <Td>
                  <Text textStyle="tdBold" textTransform="capitalize">
                    {listing.deliverable}
                  </Text>
                  <Text textStyle="tdMicro" color={gray[500]}>
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
                    <Button size="table" onClick={handleUpdateClick}>
                      Update
                    </Button>
                  ) : (
                    <Button
                      size="table"
                      onClick={handleViewClick}
                      variant="outline"
                    >
                      View
                    </Button>
                  )}
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}
