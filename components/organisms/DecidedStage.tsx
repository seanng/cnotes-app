import { Listing } from 'shared/types'
import { Container, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import StageHeading from 'components/molecules/StageHeading'
import OfferDetailsCard from 'components/molecules/OfferDetailsCard'
import OfferDetailsModal from 'components/molecules/OfferDetailsModal'

type Props = {
  listing: Listing
}

export default function DecidedStage({ listing }: Props): JSX.Element {
  const [selected, setSelected] = useState([])
  const [rejected, setRejected] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalOffer, setModalOffer] = useState({})

  useEffect(() => {
    const selectedBrandIds = listing.deals.map(deal => deal.brand.id)
    const selectedOffers = []
    const rejectedOffers = []

    const data = listing.offers.map(offer => {
      const finalOffer = offer.history[offer.history.length - 1]
      return {
        id: offer.id,
        brand: offer.brand,
        message: finalOffer.message,
        cashValue: finalOffer.cashValue,
        productValue: finalOffer.productValue,
        productUrl: finalOffer.productUrl,
        productName: finalOffer.productName,
      }
    })

    for (const offer of data) {
      if (selectedBrandIds.includes(offer.brand.id)) {
        selectedOffers.push(offer)
      } else {
        rejectedOffers.push(offer)
      }
    }
    setSelected(selectedOffers)
    setRejected(rejectedOffers)
  }, [listing])

  const handleCardClick = data => () => {
    setModalOffer(data)
    setIsModalOpen(true)
  }

  return (
    <>
      <StageHeading data={listing} />
      <Container mt={6}>
        <Text textStyle="h4" mb={5}>
          what&apos;s next?
        </Text>
        <Text textStyle="base" mb={5}>
          Look out for an email from us with instructions on how to connect with
          your brand partners.
        </Text>
        <Text textStyle="base" mb={7}>
          Brands you have selected to work with will appear as separate cards on
          your dashboard.
        </Text>
        <Text textStyle="h4" mb={5}>
          selected
        </Text>
        {selected.length > 0 ? (
          selected.map(offer => (
            <OfferDetailsCard
              key={offer.id}
              activity={offer}
              mb={6}
              shouldShowViewMore
              cursor="pointer"
              onClick={handleCardClick(offer)}
            />
          ))
        ) : (
          <Text textStyle="base" mb={6}>
            You did not select any offers.
          </Text>
        )}
        <Text textStyle="h4" mb={5}>
          rejected
        </Text>
        {rejected.length > 0 ? (
          rejected.map(offer => (
            <OfferDetailsCard
              key={offer.id}
              activity={offer}
              mb={6}
              shouldShowViewMore
              cursor="pointer"
              onClick={handleCardClick(offer)}
            />
          ))
        ) : (
          <Text textStyle="base" mb={6}>
            You did not reject any offers.
          </Text>
        )}
      </Container>
      <OfferDetailsModal
        isOpen={isModalOpen}
        onClose={(): void => {
          setIsModalOpen(false)
        }}
        offer={modalOffer}
      />
    </>
  )
}
