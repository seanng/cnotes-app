import { Listing } from 'shared/types'
import StageHeading from 'components/molecules/StageHeading'
import { Button, Box, Container, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import OfferDetailsCard from 'components/molecules/OfferDetailsCard'
import FeedbackModal from 'components/molecules/FeedbackModal'
import { useMutation, gql } from '@apollo/client'
import { useColors } from 'hooks'
import OfferDetailsModal from 'components/molecules/OfferDetailsModal'

const COMPLETE_LISTING = gql`
  mutation completeListing($id: ID!, $input: [CreateDealsInput]!) {
    completeListing(id: $id, input: $input) {
      id
      status
      deals {
        brand {
          id
        }
      }
      decidedAt
    }
  }
`

type Props = {
  listing: Listing
}

declare global {
  interface Window {
    $crisp: Array<string[]>
  }
}

export default function SelectingStage({ listing }: Props): JSX.Element {
  const [offers, setOffers] = useState([])
  const [modalOfferIdx, setModalOfferIdx] = useState(0)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [selectCount, setSelectCount] = useState(0)
  const { gray } = useColors()
  const [completeListing] = useMutation(COMPLETE_LISTING)

  useEffect(() => {
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
        isSelected: false,
      }
    })
    setOffers(data)

    if (window && window.$crisp) {
      window.$crisp.push(['do', 'chat:hide'])
    }

    return () => {
      if (window && window.$crisp) {
        window.$crisp.push(['do', 'chat:show'])
      }
    }
  }, [])

  useEffect(() => {
    setSelectCount(
      offers.reduce((prev, curr) => {
        return curr.isSelected ? prev + 1 : prev
      }, 0)
    )
  }, [offers])

  const handleCardClick = i => () => {
    setModalOfferIdx(i)
    setIsInfoModalOpen(true)
  }

  const handleModalSelect = () => {
    const newOffers = offers.slice()
    newOffers[modalOfferIdx].isSelected = !newOffers[modalOfferIdx].isSelected
    setOffers(newOffers)
    setIsInfoModalOpen(false)
  }

  const handleFinalConfirm = async () => {
    const input = offers
      .filter(({ isSelected }) => isSelected)
      .map(offer => {
        return {
          brandId: offer.brand.id,
          cashValue: offer.cashValue,
          productValue: offer.productValue,
          productName: offer.productName,
          productUrl: offer.productUrl,
          message: offer.message,
        }
      })
    await completeListing({
      variables: { id: listing.id, input },
    })
  }

  return (
    <>
      <StageHeading data={listing} specs={listing.specs} />
      <Container mt={[6, 10]} mb={110}>
        <Text textStyle="h4" mb={5}>
          select offers
        </Text>
        <Text textStyle="base" mb={3}>
          Congratulations! You have received offers for your listing!
        </Text>
        <Text textStyle="base" mb={8}>
          Click on a card to view more information. You can select multiple
          offers to initiate separate deals.
        </Text>
        {offers.map((offer, i) => (
          <OfferDetailsCard
            key={offer.id}
            activity={offer}
            mb={6}
            shouldShowViewMore
            onClick={handleCardClick(i)}
            cursor="pointer"
            {...(offer.isSelected && { boxShadow: `0 0 0 3px #00C0CC` })}
          />
        ))}
      </Container>
      {selectCount > 0 && (
        <Box
          w="full"
          bgColor={gray[0]}
          // borderTopWidth={1}
          // borderColor="gray"
          zIndex="docked"
          position="fixed"
          bottom={0}
          py={8}
        >
          <Container>
            <Flex justify="space-between">
              <Text textStyle="h5">{`${selectCount} offer${
                selectCount > 1 ? 's' : ''
              } selected`}</Text>
              <Button
                onClick={(): void => {
                  setIsConfirmationModalOpen(true)
                }}
              >
                Confirm
              </Button>
            </Flex>
          </Container>
        </Box>
      )}
      {/* Info Modal */}
      <OfferDetailsModal
        isOpen={isInfoModalOpen}
        onClose={(): void => {
          setIsInfoModalOpen(false)
        }}
        button={
          <Button onClick={handleModalSelect} isFullWidth>
            {offers[modalOfferIdx]?.isSelected
              ? 'Deselect Offer'
              : 'Select offer'}
          </Button>
        }
        offer={offers[modalOfferIdx]}
      />
      {/* Confirmation Modal */}
      <FeedbackModal
        isOpen={isConfirmationModalOpen}
        hasCloseButton
        closeOnOverlayClick
        size="xl"
        onClose={(): void => {
          setIsConfirmationModalOpen(false)
        }}
        header="confirm selection?"
        body={
          <Flex direction="column" align="center">
            <Text mb={6}>This will start the brand deals</Text>
            <Box overflowY="scroll" maxHeight="calc(60vh)">
              {offers
                .filter(({ isSelected }) => isSelected)
                .map(offer => (
                  <OfferDetailsCard
                    key={offer.id}
                    activity={offer}
                    mb={6}
                    bgColor={gray[50]}
                  />
                ))}
            </Box>
          </Flex>
        }
        button={
          <Flex justify="space-between" w="full">
            <Button
              colorScheme="gray"
              isFullWidth
              onClick={(): void => {
                setIsConfirmationModalOpen(false)
              }}
              mr={4}
            >
              Cancel
            </Button>
            <Button isFullWidth onClick={handleFinalConfirm}>
              Confirm
            </Button>
          </Flex>
        }
        variant="new"
      />
    </>
  )
}
