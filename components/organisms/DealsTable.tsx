import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
import { Deal } from 'shared/types'
import {
  Th,
  Button,
  Table,
  Thead,
  Tbody,
  Avatar,
  Text,
  Flex,
  Td,
  Tr,
  // LinkBox,
  // LinkOverlay,
} from '@chakra-ui/react'
import { useColors } from 'hooks'
import TableLoadingSkeleton from 'components/molecules/TableLoadingSkeleton'
import BrandDashOfferValue from 'components/atoms/BrandDashOfferValue'

const MY_DEALS = gql`
  query brandDashDeals {
    brandDashDeals {
      id
      status
      createdAt
      productValue
      productName
      cashValue
      listing {
        id
        creator {
          alias
          slug
          avatarUrl
        }
        platform
        deliverable
      }
    }
  }
`

const columns = [
  'Creator',
  'Deal size',
  'Date created',
  'Deliverable',
  'Status',
  '', // Button
]

export default function DealsTable(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [deals, setDeals] = useState<Deal[]>([])
  const { data } = useQuery(MY_DEALS, {
    // fetchPolicy: 'no-cache',
  })

  const { gray } = useColors()

  useEffect(() => {
    if (data && data.brandDashDeals) {
      setIsLoading(true)
      const sortedDeals = [...data.brandDashDeals].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      setDeals(sortedDeals)
      setIsLoading(false)
    }
  }, [data])

  const handleViewClick = () => {
    console.log('handleViewClick: ', handleViewClick)
  }

  if (isLoading) {
    return <TableLoadingSkeleton />
  }

  // handle empty state
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
        {deals.map((deal, i) => {
          const { listing } = deal
          return (
            <Tr key={deal.id}>
              <Td
                {...(i === 0 && { borderTopLeftRadius: 'lg' })}
                {...(i === deals.length - 1 && {
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
                <BrandDashOfferValue offer={deal} />
              </Td>
              <Td textStyle="tdBold">
                {format(new Date(deal.createdAt), 'd MMM y')}
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
                {...(i === deals.length - 1 && {
                  borderBottomRightRadius: 'lg',
                })}
              >
                <ListingStatusBadge status={deal.status} />
              </Td>
              <Td bgColor="transparent">
                <Button
                  size="table"
                  onClick={handleViewClick}
                  variant="outline"
                >
                  View
                </Button>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
