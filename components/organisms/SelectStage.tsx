import { Listing } from 'shared/types'
import StageHeading from 'components/molecules/StageHeading'
import { Button, Box, Avatar, Container, Flex, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import OfferDetailsCard from 'components/molecules/OfferDetailsCard'
import FeedbackModal from 'components/molecules/FeedbackModal'
import { useColors } from 'utils/colors'

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
  const { gray, cyan } = useColors()

  useEffect(() => {
    const data = listing.offers.map(offer => {
      const finalOffer = offer.history[offer.history.length - 1]
      return {
        id: offer.id,
        brand: offer.brand,
        message: finalOffer.message,
        price: finalOffer.price,
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

  const handleFinalConfirm = () => {
    console.log('confirm can')
  }

  return (
    <>
      <StageHeading listing={listing} />
      <Container mt={[6, 10]} mb={110}>
        <Text textStyle="h4" mb={[5, 8]}>
          select offers
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
        {}
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
      <FeedbackModal
        isOpen={isInfoModalOpen}
        hasCloseButton
        closeOnOverlayClick
        onClose={(): void => {
          setIsInfoModalOpen(false)
        }}
        header="about this offer"
        body={
          <Flex direction="column" align="center">
            <Avatar
              mt={2}
              mb={5}
              size="xl"
              src={offers[modalOfferIdx]?.brand.avatarUrl}
            />
            <Text color={gray[800]} textStyle="large" fontWeight={700} mb={2}>
              {`$${offers[modalOfferIdx]?.price}`}
            </Text>
            <Text textStyle="small" textAlign="center" mb={4}>
              {offers[modalOfferIdx]?.price > 0 &&
                `💰 $${offers[modalOfferIdx]?.price} + `}
              <Box as="span" color={cyan[600]}>
                🎁 WH-1000MX4 Wireless noise cancelling headphones ($200)
              </Box>
            </Text>
            <Text
              textStyle={['small', 'base']}
              color={gray[500]}
              textAlign="center"
              mb={4}
            >
              {`"${offers[modalOfferIdx]?.message}"`}
            </Text>
          </Flex>
        }
        button={
          <Button onClick={handleModalSelect} isFullWidth>
            {offers[modalOfferIdx]?.isSelected
              ? 'Deselect Offer'
              : 'Select offer'}
          </Button>
        }
        variant="new"
      />
      {/* Confirmation Modal */}
      <FeedbackModal
        isOpen={isConfirmationModalOpen}
        hasCloseButton
        closeOnOverlayClick
        onClose={(): void => {
          setIsConfirmationModalOpen(false)
        }}
        header="confirm selection?"
        body={
          <Flex direction="column" align="center">
            <Text mb={6}>This will start the brand deals</Text>
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
