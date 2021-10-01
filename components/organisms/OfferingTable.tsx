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
import CountdownTimer from 'components/atoms/CountdownTimer'
import { CREATOR_AVATAR_TEXT_SPACING } from 'shared/constants'
import { FC, useState, useEffect } from 'react'
import OfferInput from 'components/molecules/OfferInput'
import OfferModal from 'components/molecules/OfferModal'
import { useQuery, gql } from '@apollo/client'
import { User, Offer } from 'shared/types'
import { formatRelative } from 'date-fns'

const columns = [
  'Creator',
  'Deliverable',
  'Time Left',
  'Highest Offer',
  'My Offer',
  '', // Offer Button
]

type Props = {
  user: User
}

const MY_OFFERS = gql`
  query myOffers {
    myOffers {
      id
      history {
        productUrl
        price
        message
      }
      listing {
        id
        platform
        deliverable
        status
        highestOffer
        offerCount
        auctionEndsAt
        creator {
          alias
          avatarUrl
        }
        completedAt
      }
    }
  }
`

const OfferingTable: FC<Props> = () => {
  const [modalDefaultValues, setModalDefaultValues] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [offers, setOffers] = useState<Offer[]>([])
  const [price, setPrice] = useState(0)
  const [selectedListing, setSelectedListing] = useState(null)
  const { data, loading } = useQuery(MY_OFFERS, {
    // fetchPolicy: 'no-cache',
  })

  useEffect(() => {
    if (data && data.myOffers) {
      const sortedOffers = data.myOffers.filter(
        ({ listing }) => new Date(listing.auctionEndsAt) > now
      )
      setOffers(sortedOffers)
    }
  }, [data])

  const handleOfferEnter =
    offer =>
    ({ input }: { input: number }): void => {
      setSelectedListing(offer.listing)
      setPrice(input)
      setModalDefaultValues({
        message: offer.history[offer.history.length - 1].message,
        productUrl: offer.history[offer.history.length - 1].productUrl,
      })
      setIsModalOpen(true)
    }

  const now = new Date()

  if (loading) {
    return <div>loading...</div>
  }

  if (!offers || offers.length === 0) {
    return (
      <Box textStyle="xLarge">There are no ongoing offers at the moment</Box>
    )
  }

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
          {offers.map(offer => {
            const { listing, history } = offer
            const currentOfferPrice = history[history.length - 1].price
            return (
              <LinkBox as={Tr} key={listing.id}>
                <Td>
                  <NextLink href={`/listing/${listing.id}`} passHref>
                    <LinkOverlay>
                      <Flex align="center">
                        <Avatar
                          name={listing.creator.alias}
                          src={listing.creator.avatarUrl}
                        />
                        <Flex
                          direction="column"
                          ml={CREATOR_AVATAR_TEXT_SPACING}
                        >
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
                  <Flex direction="column" minWidth={208}>
                    <CountdownTimer end={listing.auctionEndsAt} />
                    <Box textStyle="mini">
                      {`Ends ${formatRelative(
                        new Date(listing.auctionEndsAt),
                        now
                      )}`}
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <Flex direction="column">
                    <Box>${listing.highestOffer.toLocaleString()}</Box>
                    <Box textStyle="mini">{listing.offerCount} offers</Box>
                  </Flex>
                </Td>
                <Td>${currentOfferPrice.toLocaleString()}</Td>
                <Td pr={0} textAlign="right">
                  <OfferInput
                    minOffer={currentOfferPrice}
                    onSubmit={handleOfferEnter(offer)}
                  />
                </Td>
              </LinkBox>
            )
          })}
        </Tbody>
      </Table>
      <OfferModal
        listing={selectedListing}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        isOpen={isModalOpen}
        price={price}
        defaultValues={modalDefaultValues}
      />
    </>
  )
}

export default OfferingTable
