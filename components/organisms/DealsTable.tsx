import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import { Deal } from 'shared/types'
import {
  Th,
  Button,
  Table,
  Thead,
  Tbody,
  Avatar,
  Text,
  // Box,
  Flex,
  Td,
  Tr,
  // LinkBox,
  // LinkOverlay,
} from '@chakra-ui/react'
import TableLoadingSkeleton from 'components/molecules/TableLoadingSkeleton'

const MY_DEALS = gql`
  query myDeals {
    myDeals {
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

  useEffect(() => {
    if (data && data.myDeals) {
      setIsLoading(true)
      const sortedDeals = data.myDeals.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })

      console.log('sortedDeals: ', sortedDeals)
      setDeals(sortedDeals)
      setIsLoading(false)
    }
  }, [data])

  const handleViewClick = () => {
    console.log('handleViewClick: ', handleViewClick)
  }

  return isLoading ? (
    <TableLoadingSkeleton />
  ) : (
    <Table variant="brandDashboard2">
      <Thead>
        <Tr>
          {columns.map(col => (
            <Th key={col}>{col}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {deals.map((deal, i) => {
          // const { listing } = deal
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
                    name={deal.listing.creator.alias}
                    src={deal.listing.creator.avatarUrl}
                    size="sm"
                  />
                  <Flex direction="column" ml={2}>
                    <Text textStyle="tdBold">{deal.listing.creator.alias}</Text>
                  </Flex>
                </Flex>
              </Td>
              <Td>deal size</Td>
              <Td>date created</Td>
              <Td>deliverable</Td>
              <Td>status</Td>
              <Td>
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
