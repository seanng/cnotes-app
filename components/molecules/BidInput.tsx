import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
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
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Offer } from 'shared/types'
import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import FormInput from 'components/atoms/FormInput'
import { URL_REGEX } from 'shared/constants'

const CreateBidMutation = gql`
  mutation CreateOfferMutation($input: CreateOfferInput!) {
    createOffer(input: $input) {
      _id
    }
  }
`

type Props = {
  offer: Offer
}

type OnConfirmProps = {
  message: string
  productUrl: string
}

const BidInput: FC<Props> = ({ offer }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, isValid },
  } = useForm({ mode: 'onChange' })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [price, setPrice] = useState(0)

  const handleModalClose = (): void => {
    setIsModalOpen(false)
  }

  const onBidEnter = ({ input }: { input: number }): void => {
    setPrice(input)
    setIsModalOpen(true)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onBidEnter)}>
        <InputGroup w={115}>
          <Input
            borderRadius="full"
            type="number"
            placeholder="Bid"
            {...register('input', {
              required: true,
            })}
          />
          <InputRightElement>
            <IconButton
              type="submit"
              disabled={!isValid || isSubmitting}
              aria-label="Bid"
              icon={<ArrowForwardIcon />}
            />
          </InputRightElement>
        </InputGroup>
      </form>
      <BidModal
        offer={offer}
        onClose={handleModalClose}
        isOpen={isModalOpen}
        price={price}
      />
    </>
  )
}

type ModalProps = {
  onClose: () => void
  isOpen: boolean
  price: number
  offer: Offer
}

// TODO: may have to move to react context to prevent rendering of multiple modals per page.
const BidModal: FC<ModalProps> = ({
  onClose,
  isOpen,
  price,
  offer,
}: ModalProps) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm()

  const [createBid] = useMutation(CreateBidMutation)
  const [showSuccess, setShowSuccess] = useState(false)

  const onConfirm = async (input: OnConfirmProps): Promise<void> => {
    // submit bid to backend.

    const {
      data: { createBid: payload },
    } = await createBid({
      variables: {
        input: {
          ...input,
          price,
        },
      },
    })

    // render success.
    setShowSuccess(true)

    console.log('data: ', payload)
  }

  // TODO: may have to add useEffect when isOpen=true, setShowSuccess(false)

  return (
    <Modal onClose={onClose} isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Place a bid</ModalHeader>
        <ModalCloseButton />
        {showSuccess ? (
          <>
            <ModalBody textStyle="body2" mb={10}>
              {`You have successfully bid $${price} for a ${offer.platform} ${offer.deliverable} from ${offer.creator.firstName}.`}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit(onConfirm)}>
            <ModalBody>
              <Box textStyle="body2" mb={10}>
                {`You are about to make a bid for a ${offer.platform} ${offer.deliverable} from ${offer.creator.firstName}`}
              </Box>
              <FormInput
                label="Link to Product"
                errors={errors}
                name="productLink"
                inputProps={{
                  ...register('productLink', {
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
              <FormControl isInvalid={errors.description}>
                <FormLabel htmlFor="description">
                  Message To Creator (optional)
                </FormLabel>
                <Textarea
                  placeholder={`eg. I want you to shine for me like a whistle.`}
                  mb={8}
                  {...register('message')}
                />
              </FormControl>
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
              <Flex textStyle="body2" fontWeight="bold">
                <Box>Your bid</Box>
                <Spacer />
                <Box>{`$${price}`}</Box>
              </Flex>
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

export default BidInput
