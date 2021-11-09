import NextLink from 'next/link'
import { useQuery, gql } from '@apollo/client'
import { useState, useEffect } from 'react'
import LinkButton from 'components/atoms/LinkButton'
import { format } from 'date-fns'
import EmptyTableState from 'components/molecules/EmptyTableState'
import ListingStatusBadge from 'components/atoms/ListingStatusBadge'
import { Deal } from 'shared/types'
import { STATUS } from 'shared/constants'
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
  LinkBox,
  LinkOverlay,
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
      productMSRP
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
  STATUS,
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

  if (isLoading) {
    return <TableLoadingSkeleton />
  }

  return deals.length === 0 ? (
    <EmptyTableState
      heading="You're almost set!"
      body="Deals will be created here when your offers have been successfully selected by the creators. In the meantime, you can look for more creators to place more offers!"
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
                <LinkBox display="flex" flexDirection="row" alignItems="center">
                  <Avatar
                    name={listing.creator.alias}
                    src={listing.creator.avatarUrl}
                    size="sm"
                  />
                  <Flex direction="column" ml={2}>
                    <Text textStyle="largeBold">{listing.creator.alias}</Text>
                  </Flex>
                  <NextLink href={`/profile/${listing.creator.slug}`} passHref>
                    <LinkOverlay isExternal />
                  </NextLink>
                </LinkBox>
              </Td>
              <Td minWidth={110}>
                <BrandDashOfferValue offer={deal} />
              </Td>
              <Td textStyle="largeBold" minWidth={145}>
                {format(new Date(deal.createdAt), 'd MMM y')}
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
                {...(i === deals.length - 1 && {
                  borderBottomRightRadius: 'lg',
                })}
              >
                <ListingStatusBadge status={deal.status} />
              </Td>
              <Td bgColor="transparent">
                <LinkButton
                  size="table"
                  variant="outline"
                  href={`/listing/${listing.id}`}
                >
                  View
                </LinkButton>
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}
