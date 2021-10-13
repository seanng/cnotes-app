import EmptyTableState from 'components/molecules/EmptyTableState'
import {
  Th,
  Table,
  Thead,
  Tbody,
  Avatar,
  Text,
  Flex,
  Td,
  Tr,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { format } from 'date-fns'
import TableLoadingSkeleton from 'components/molecules/TableLoadingSkeleton'
import BrandDashOfferValue from 'components/atoms/BrandDashOfferValue'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
import { useColors } from 'hooks'
import { CANCELLED, REJECTED } from 'shared/constants'

const MY_ARCHIVED_OFFERS = gql`
  fragment ListingKeys on Listing {
    creator {
      alias
      avatarUrl
      slug
    }
    deliverable
    platform
  }
  query myArchivedOffers {
    brandDashDeals(type: "cancelled") {
      id
      status
      cashValue
      productValue
      listing {
        ...ListingKeys
      }
      cancelledAt
    }
    brandDashOffers(type: "rejected") {
      id
      history {
        cashValue
        productValue
      }
      listing {
        ...ListingKeys
        decidedAt
      }
    }
  }
`

const columns = [
  'Creator',
  'Your offer',
  'Date archived',
  'Deliverable',
  'Status',
]

export default function ArchiveTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const { data } = useQuery(MY_ARCHIVED_OFFERS, {
    // fetchPolicy: 'no-cache',
  })
  const { gray } = useColors()
  useEffect(() => {
    setIsLoading(true)
    const parsedItems = []
    if (data && data.brandDashOffers) {
      data.brandDashOffers.forEach(offer => {
        const lastOffer = offer.history[offer.history.length - 1]
        parsedItems.push({
          id: offer.id,
          status: REJECTED,
          creator: offer.listing.creator,
          deliverable: offer.listing.deliverable,
          cashValue: lastOffer.cashValue,
          productValue: lastOffer.productValue,
          platform: offer.listing.platform,
          archivedAt: offer.listing.decidedAt,
        })
      })
    }
    if (data && data.brandDashDeals) {
      data.brandDashDeals.forEach(deal => {
        parsedItems.push({
          id: deal.id,
          status: CANCELLED,
          creator: deal.listing.creator,
          deliverable: deal.listing.deliverable,
          cashValue: deal.cashValue,
          productValue: deal.productValue,
          platform: deal.listing.platform,
          archivedAt: deal.cancelledAt,
        })
      })
    }
    setItems(
      parsedItems.sort(
        (a, b) =>
          new Date(a.archivedAt).getTime() - new Date(b.archivedAt).getTime()
      )
    )
    setIsLoading(false)
  }, [data])

  if (isLoading) {
    return <TableLoadingSkeleton />
  }

  return items.length === 0 ? (
    <EmptyTableState
      heading="Nothing's archived yet!"
      body="Offers and deals that are rejected or cancelled will be shown here. In the meantime, you can look for more creators to place more offers!"
    />
  ) : (
    <Table variant="brandDashboard">
      <Thead>
        <Tr>
          {columns.map(col => (
            <Th key={col}>{col}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item, i) => {
          return (
            <Tr key={item.id}>
              <Td
                {...(i === 0 && { borderTopLeftRadius: 'lg' })}
                {...(i === items.length - 1 && {
                  borderBottomLeftRadius: 'lg',
                })}
              >
                <Flex align="center">
                  <Avatar
                    name={item.creator.alias}
                    src={item.creator.avatarUrl}
                    size="sm"
                  />
                  <Flex direction="column" ml={2}>
                    <Text textStyle="largeBold">{item.creator.alias}</Text>
                  </Flex>
                </Flex>
              </Td>
              <Td>
                <BrandDashOfferValue offer={item} />
              </Td>
              <Td>
                {item.archivedAt &&
                  format(new Date(item.archivedAt), 'd MMM y')}
              </Td>
              <Td>
                <Text textStyle="largeBold" textTransform="capitalize">
                  {item.deliverable}
                </Text>
                <Text textStyle="tdMicro" color={gray[500]}>
                  {item.platform}
                </Text>
              </Td>
              <Td
                {...(i === 0 && { borderTopRightRadius: 'lg' })}
                {...(i === items.length - 1 && {
                  borderBottomRightRadius: 'lg',
                })}
              >
                <ListingStatusBadge status={item.status} />
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
