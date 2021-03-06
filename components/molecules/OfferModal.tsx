import * as Sentry from '@sentry/nextjs'
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
  Wrap,
  WrapItem,
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
        productMSRP
        message
        productUrl
      }
      listing {
        id
        highestOfferValue
        offers {
          id
          history {
            cashValue
            message
            productMSRP
            productUrl
            productName
            createdAtString
          }
          brand {
            id
            alias
            avatarUrl
          }
        }
      }
    }
  }
`

const InfoGroup = ({ label, value, ...props }) => {
  let val = value
  if (typeof value === 'boolean') {
    val = value ? 'Yes' : 'No'
  }
  return val ? (
    <WrapItem flexDirection="column" {...props}>
      <Text fontWeight={600} textStyle="base" textTransform="capitalize">
        {val}
      </Text>
      <Text fontWeight={600} textStyle="micro" color="gray.500">
        {label}
      </Text>
    </WrapItem>
  ) : null
}

interface Input {
  message: string
  productUrl: string
  productName: string
  productMSRP?: number
  cashValue?: number
  listingId?: string
}

interface ModalProps {
  onClose: () => void
  isOpen: boolean
  heading?: string
  listing: Listing
  isUpdate?: boolean
  defaultValues?: Input
}

const defaultDefaultValues = {
  message: '',
  productUrl: '',
  productName: '',
  productMSRP: 0,
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
    formState: { errors },
  } = useForm({
    defaultValues,
  })
  const productMSRP = watch('productMSRP')
  const cashValue = watch('cashValue')
  const hasproductMSRP = productMSRP > 0
  const [minTotalValue, setMinTotalValue] = useState(0)
  const [showMinValueError, setShowMinValueError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [storedInput, setStoredInput] = useState<Input>(defaultDefaultValues)

  const [placeOffer] = useMutation(PLACE_OFFER)
  const { gray } = useColors()

  useEffect(() => {
    setShowSuccess(false)
    setShowMinValueError(false)
    reset(defaultValues)
    setMinTotalValue(defaultValues.cashValue + defaultValues.productMSRP)
  }, [defaultValues, reset])

  useEffect(() => {
    const totalValue = productMSRP + cashValue
    setShowMinValueError(totalValue < minTotalValue)
  }, [cashValue, productMSRP])

  const onSubmit = input => {
    setStoredInput({
      cashValue: input.cashValue,
      productMSRP: input.productMSRP,
      productName: hasproductMSRP ? input.productName : '',
      productUrl: hasproductMSRP ? input.productUrl : '',
      message: input.message,
      listingId: listing.id,
    })
    setShowConfirm(true)
  }

  const onConfirm = async (): Promise<void> => {
    // show are you sure modal.
    try {
      setIsSubmitting(true)
      await placeOffer({
        variables: {
          input: storedInput,
        },
      })
      setIsSubmitting(false)
    } catch (error) {
      Sentry.captureException(error)
    }
    setShowConfirm(false)
    setShowSuccess(true)
  }

  // useEffect(() => {}, [isOpen])

  const handleConfirmModalClose = () => {
    setShowConfirm(false)
  }

  const handleNumberInputBlur = e => {
    if (e.target.value === '') {
      setValue(e.target.name, 0)
    }
  }

  const handleNumberInputFocus = e => {
    if (e.target.value === '0') {
      setValue(e.target.name, '')
    }
  }

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        isCentered
        variant="new"
        size={showSuccess ? 'md' : 'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="left">
            <Text textStyle="xLarge">
              {showSuccess
                ? 'Success'
                : isUpdate
                ? 'Update Offer'
                : 'Place Offer'}
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
                <Button isFullWidth onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Box
                  fontWeight={600}
                  pb={8}
                  borderBottom="1px solid"
                  borderColor={gray[50]}
                  mb={6}
                >
                  <Wrap alignContent="center" spacing={4} mb={4}>
                    <InfoGroup label="platform" value={listing?.platform} />
                    <InfoGroup
                      label="deliverable"
                      value={listing?.deliverable}
                    />
                    <InfoGroup
                      label="highest"
                      value={`$${listing?.highestOfferValue.toLocaleString()}`}
                    />
                    <InfoGroup
                      label="offers"
                      value={listing?.offerCount ?? listing?.offers.length}
                    />
                  </Wrap>
                  <Wrap spacing={4}>
                    <InfoGroup
                      label="Length"
                      value={listing?.specs?.videoLength}
                    />
                    <InfoGroup
                      label="Revisions"
                      value={listing?.specs?.numberOfRevisions}
                    />
                    <InfoGroup
                      label="Preview"
                      value={listing?.specs?.previewTime}
                    />
                    <InfoGroup
                      label="Reusable"
                      value={listing?.specs?.canReuse}
                    />
                    <InfoGroup
                      label="Scripted"
                      value={listing?.specs?.willFollowScript}
                    />
                  </Wrap>
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
                      onFocus: handleNumberInputFocus,
                    }}
                    mr={2}
                  />
                  <FormInput
                    label="Product MSRP"
                    prefixElement="$"
                    helpText="The price that the manufacturer recommends it be sold for."
                    inputProps={{
                      type: 'number',
                      ...register('productMSRP', {
                        valueAsNumber: true,
                        min: 0,
                      }),
                      onBlur: handleNumberInputBlur,
                      onFocus: handleNumberInputFocus,
                    }}
                  />
                </Flex>
                <Text color="red" mb={1} height="22px">
                  {showMinValueError
                    ? `Total offer value must not be lower than your previous total offer value ($${minTotalValue})`
                    : ''}
                </Text>
                <FormInput
                  label="Product name"
                  error={errors.productName}
                  inputProps={{
                    placeholder: hasproductMSRP
                      ? 'Enter product name'
                      : 'Product MSRP must be higher than $0',
                    ...register('productName', {
                      disabled: !hasproductMSRP,
                      required: hasproductMSRP,
                    }),
                  }}
                  mb={5}
                />
                <FormInput
                  label="Product URL (optional)"
                  error={errors.productUrl}
                  inputProps={{
                    placeholder: hasproductMSRP
                      ? 'https://www.apple.com/shop/buy-iphone/iphone-11'
                      : 'Product MSRP must be higher than $0',
                    ...register('productUrl', {
                      disabled: !hasproductMSRP,
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
                    placeholder={`Enter a detailed description of your video brief request.`}
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
                    onClick={onClose}
                    mr={4}
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={showMinValueError}
                    isFullWidth
                    type="submit"
                  >
                    {isUpdate ? 'Update' : 'Place Offer'}
                  </Button>
                </Flex>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
      <Modal
        onClose={handleConfirmModalClose}
        isOpen={showConfirm}
        variant="new"
        size={'sm'}
        closeOnOverlayClick={false}
        isCentered
        blockScrollOnMount={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text textStyle="large" fontWeight={500}>
              {`Are you sure you want to ${
                isUpdate ? 'update your' : 'place an'
              } offer? ($${storedInput.cashValue.toLocaleString()} Cash + $${storedInput.productMSRP.toLocaleString()} MSRP)`}
            </Text>
          </ModalHeader>
          <ModalFooter>
            <Flex justify="space-between" w="full">
              <Button
                colorScheme="gray"
                isFullWidth
                disabled={isSubmitting}
                onClick={handleConfirmModalClose}
                mr={4}
              >
                No
              </Button>
              <Button
                disabled={isSubmitting}
                isFullWidth
                isLoading={isSubmitting}
                onClick={onConfirm}
              >
                Yes
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
