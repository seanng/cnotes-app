import { useMutation, gql } from '@apollo/client'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { useState, FC, useEffect } from 'react'
import FormInput from 'components/atoms/FormInput'
import { useForm } from 'react-hook-form'
import { Listing } from 'shared/types'
import { URL_REGEX } from 'shared/constants'

const PLACE_BID = gql`
  mutation placeOffer($input: PlaceOfferInput!) {
    placeOffer(input: $input) {
      id
      message
      productUrl
      history {
        price
      }
      listing {
        id
        offerCount
        highestOffer
      }
    }
  }
`

type OnConfirmProps = {
  message: string
  productUrl: string
}

type DefaultValues = {
  message: string
  productUrl: string
}

type ModalProps = {
  onClose: () => void
  isOpen: boolean
  price: number
  listing: Listing
  defaultValues?: DefaultValues
}

const OfferModal: FC<ModalProps> = ({
  onClose,
  isOpen,
  price,
  listing,
  defaultValues = { message: '', productUrl: '' },
}: ModalProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues,
  })
  const [placeOffer] = useMutation(PLACE_BID)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    setShowSuccess(false)
    reset(defaultValues)
  }, [defaultValues])

  const onConfirm = async (input: OnConfirmProps): Promise<void> => {
    await placeOffer({
      variables: {
        input: {
          ...input,
          listingId: listing.id,
          price,
        },
      },
    })
    setShowSuccess(true)
  }

  const onSuccess = (): void => {
    onClose()
  }

  if (!listing) {
    return <Box />
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Place an offer</ModalHeader>
        <ModalCloseButton />
        {showSuccess ? (
          <>
            <ModalBody textStyle="base" mb={10}>
              {`You have successfully placed an offer of $${price} for a ${listing.platform} ${listing.deliverable} from ${listing.creator.alias}.`}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onSuccess}>Close</Button>
            </ModalFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onConfirm)}>
            <ModalBody>
              <Box textStyle="base" mb={10}>
                {`You are about to make an offer for a ${listing.platform} ${listing.deliverable} from ${listing.creator.alias}`}
              </Box>
              <Flex mb={1} color="gray.600" textStyle="small">
                <Box>Time left</Box>
                <Spacer />
                <Box>3 hours 3 minutes left</Box>
              </Flex>
              <Flex mb={2} color="gray.600" textStyle="small">
                <Box>Total number of offers</Box>
                <Spacer />
                <Box>3</Box>
              </Flex>
              <Flex textStyle="base" fontWeight={700} mb={6}>
                <Box>Your offer</Box>
                <Spacer />
                <Box>{`$${price}`}</Box>
              </Flex>
              <FormInput
                label="Link to Product"
                error={errors.productUrl}
                inputProps={{
                  ...register('productUrl', {
                    required: true,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Enter a valid url',
                    },
                  }),
                  placeholder:
                    'https://www.apple.com/shop/buy-iphone/iphone-11',
                }}
                mb={10}
              />
              <FormControl isInvalid={!!errors.message}>
                <FormLabel htmlFor="description">Message To Creator</FormLabel>
                <Textarea
                  placeholder={`eg. I want you to shine for me like a whistle.`}
                  // mb={8}
                  {...register('message')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" disabled={isSubmitting} mr={4}>
                Place offer
              </Button>
              <Button
                disabled={isSubmitting}
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

export default OfferModal
