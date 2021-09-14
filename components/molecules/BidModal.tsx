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
import { Offer } from 'shared/types'
import { URL_REGEX } from 'shared/constants'

const PLACE_BID = gql`
  mutation placeBid($input: PlaceBidInput!) {
    placeBid(input: $input) {
      id
      message
      productUrl
      history {
        price
      }
      offer {
        id
        bidCount
        highestBid
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
  offer: Offer
  defaultValues?: DefaultValues
}

const BidModal: FC<ModalProps> = ({
  onClose,
  isOpen,
  price,
  offer,
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
  const [placeBid] = useMutation(PLACE_BID)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    setShowSuccess(false)
    reset(defaultValues)
  }, [defaultValues])

  const onConfirm = async (input: OnConfirmProps): Promise<void> => {
    await placeBid({
      variables: {
        input: {
          ...input,
          offerId: offer.id,
          price,
        },
      },
    })
    setShowSuccess(true)
  }

  const onSuccess = (): void => {
    onClose()
  }

  if (!offer) {
    return <Box />
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Place a bid</ModalHeader>
        <ModalCloseButton />
        {showSuccess ? (
          <>
            <ModalBody textStyle="body2" mb={10}>
              {`You have successfully bid $${price} for a ${offer.platform} ${offer.deliverable} from ${offer.creator.alias}.`}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onSuccess}>Close</Button>
            </ModalFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onConfirm)}>
            <ModalBody>
              <Box textStyle="body2" mb={10}>
                {`You are about to make a bid for a ${offer.platform} ${offer.deliverable} from ${offer.creator.alias}`}
              </Box>
              <Flex mb={1} color="neutrals4" textStyle="caption1">
                <Box>Time left</Box>
                <Spacer />
                <Box>3 hours 3 minutes left</Box>
              </Flex>
              <Flex mb={2} color="neutrals4" textStyle="caption1">
                <Box>Total number of bids</Box>
                <Spacer />
                <Box>3</Box>
              </Flex>
              <Flex textStyle="body2" fontWeight="bold" mb={6}>
                <Box>Your bid</Box>
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
                <FormLabel htmlFor="description">
                  Message To Creator (optional)
                </FormLabel>
                <Textarea
                  placeholder={`eg. I want you to shine for me like a whistle.`}
                  // mb={8}
                  {...register('message')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" disabled={isSubmitting} mr={4}>
                Place bid
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

export default BidModal
