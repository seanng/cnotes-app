import { useMutation, gql } from '@apollo/client'
import {
  Modal,
  FormControl,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalCloseButton,
  Flex,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react'
import Textarea from 'components/atoms/Textarea'
import { useForm } from 'react-hook-form'
import { Listing } from 'shared/types'
import { useColors } from 'hooks'
import FormInput from 'components/atoms/FormInput'
import { useState, useEffect } from 'react'
import { URL_REGEX } from 'shared/constants'

const PLACE_OFFER = gql`
  mutation placeOffer($input: PlaceOfferInput!) {
    placeOffer(input: $input) {
      id
      history {
        cashValue
        productValue
        message
        productUrl
      }
      listing {
        id
        highestOfferValue
      }
    }
  }
`

interface ModalProps {
  onClose: () => void
  isOpen: boolean
  heading?: string
  listing: Listing
  isUpdate?: boolean
  defaultValues?: {
    message: string
    productUrl: string
    productName: string
    productValue?: number
    cashValue?: number
  }
}

const defaultDefaultValues = {
  message: '',
  productUrl: '',
  productName: '',
  productValue: 0,
  cashValue: 0,
}

export default function OfferModal({
  onClose,
  isOpen,
  listing,
  defaultValues = defaultDefaultValues,
  isUpdate = false,
}: ModalProps): JSX.Element {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues,
  })
  const productValue = watch('productValue')
  const cashValue = watch('cashValue')
  const hasProductValue = productValue > 0
  const [minTotalValue, setMinTotalValue] = useState(0)
  const [showMinValueError, setShowMinValueError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [placeOffer] = useMutation(PLACE_OFFER)
  const { gray } = useColors()

  useEffect(() => {
    setMinTotalValue(defaultValues.cashValue + defaultValues.productValue)
  }, [defaultValues])

  useEffect(() => {
    const totalValue = productValue + cashValue
    setShowMinValueError(totalValue < minTotalValue)
  }, [cashValue, productValue])

  const onConfirm = async (input): Promise<void> => {
    await placeOffer({
      variables: {
        input: {
          cashValue: input.cashValue,
          productValue: input.productValue,
          productName: hasProductValue ? input.productName : '',
          productUrl: hasProductValue ? input.productUrl : '',
          message: input.message,
          listingId: listing.id,
        },
      },
    })
    setShowSuccess(true)
  }

  const handleClose = () => {
    onClose()
    setShowSuccess(false)
    reset(defaultValues)
    setShowMinValueError(false)
  }

  const handleNumberInputBlur = e => {
    if (e.target.value === '') {
      setValue(e.target.name, 0)
    }
  }

  return (
    <Modal
      onClose={handleClose}
      isOpen={isOpen}
      closeOnOverlayClick={false}
      variant="new"
      size={showSuccess ? 'md' : 'xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="left">
          <Text textStyle="xLarge">
            {isUpdate ? 'Update Offer' : 'Place Offer'}
          </Text>
        </ModalHeader>
        <ModalCloseButton top={6} right={6} />
        {showSuccess ? (
          <>
            <ModalBody textStyle="base" mb={4}>
              {`You have successfully ${
                isUpdate ? 'updated your' : 'placed an'
              } offer.`}
            </ModalBody>
            <ModalFooter>
              <Button isFullWidth onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onConfirm)}>
            <ModalBody>
              <Box
                fontWeight={600}
                pb={8}
                borderBottom="1px solid"
                borderColor={gray[50]}
                mb={8}
              >
                {/* general info box */}
                <Text
                  fontWeight={600}
                  textStyle="base"
                  textTransform="capitalize"
                >
                  {`${listing?.platform} ${listing?.deliverable}`}
                </Text>
                <Text
                  fontWeight={600}
                  textStyle="micro"
                  color={gray[500]}
                  mb={5}
                >
                  {`48h media preview 2 revisions`}
                </Text>
                <Flex>
                  <Box mr={6}>
                    <Text fontWeight={600} textStyle="base">
                      ${listing?.highestOfferValue}
                    </Text>
                    <Text fontWeight={600} textStyle="micro" color={gray[500]}>
                      Highest
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight={600} textStyle="base">
                      6
                    </Text>
                    <Text fontWeight={600} textStyle="micro" color={gray[500]}>
                      Offers
                    </Text>
                  </Box>
                </Flex>
              </Box>
              {/* form */}
              <Flex>
                <FormInput
                  label="Cash offer"
                  prefixElement="$"
                  error={errors?.cashValue}
                  inputProps={{
                    placeholder: 'The monetary offer amount',
                    type: 'number',
                    ...register('cashValue', {
                      valueAsNumber: true,
                      min: 0,
                    }),
                    onBlur: handleNumberInputBlur,
                  }}
                  mr={2}
                />
                <FormInput
                  label="Product value"
                  prefixElement="$"
                  inputProps={{
                    type: 'number',
                    ...register('productValue', {
                      valueAsNumber: true,
                      min: 0,
                    }),
                    onBlur: handleNumberInputBlur,
                  }}
                />
              </Flex>
              <Text color="red" mb={5}>
                {showMinValueError
                  ? `Total offer value must not be lower than your previous total offer value ($${minTotalValue})`
                  : ''}
              </Text>
              <FormInput
                label="Product name"
                error={errors.productName}
                inputProps={{
                  placeholder: hasProductValue
                    ? 'Enter product name'
                    : 'Product value required',
                  ...register('productName', {
                    disabled: !hasProductValue,
                    required: hasProductValue,
                  }),
                }}
                mb={5}
              />
              <FormInput
                label="Product URL (optional)"
                error={errors.productUrl}
                inputProps={{
                  placeholder: hasProductValue
                    ? 'https://www.apple.com/shop/buy-iphone/iphone-11'
                    : 'Product value required',
                  ...register('productUrl', {
                    disabled: !hasProductValue,
                    pattern: {
                      value: URL_REGEX,
                      message: 'Enter a valid url',
                    },
                  }),
                }}
                mb={5}
              />
              <FormControl isInvalid={!!errors.message}>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Textarea
                  placeholder={`eg. I want you to shine for me like a whistle.`}
                  rows={4}
                  {...register('message')}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Flex justify="space-between" w="full">
                <Button
                  colorScheme="gray"
                  isFullWidth
                  onClick={handleClose}
                  mr={4}
                >
                  Cancel
                </Button>
                <Button
                  disabled={showMinValueError || isSubmitting}
                  isFullWidth
                  type="submit"
                >
                  {isUpdate ? 'Update' : 'Place'}
                </Button>
              </Flex>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}
