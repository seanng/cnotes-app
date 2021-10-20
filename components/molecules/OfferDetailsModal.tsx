import FeedbackModal, { FeedbackModalProps } from './FeedbackModal'
import { Text, Avatar, Box, Flex } from '@chakra-ui/react'
import { OfferHistoryItem, User } from 'shared/types'
import { useColors } from 'hooks'
import LinkText from 'components/atoms/LinkText'

type Props = {
  offer: {
    brand?: User
  } & OfferHistoryItem
} & Omit<FeedbackModalProps, 'header'>

export default function OfferDetailsModal({
  offer,
  onClose,
  isOpen,
  ...props
}: Props): JSX.Element {
  const { gray, cyan } = useColors()

  return (
    <FeedbackModal
      hasCloseButton
      closeOnOverlayClick
      header="about this offer"
      body={
        <Flex direction="column" align="center">
          <Avatar mt={2} mb={5} size="xl" src={offer?.brand?.avatarUrl} />
          <Text color={gray[800]} textStyle="large" fontWeight={700} mb={2}>
            {`$${offer?.cashValue + offer?.productValue}`}
          </Text>
          <Text textStyle="small" textAlign="center" mb={4}>
            {offer?.cashValue > 0 && (
              <Box as="span" mr={3}>
                💰${offer.cashValue}
              </Box>
            )}
            {offer?.productName && (
              <Box
                as={offer.productUrl ? LinkText : 'span'}
                textTransform="uppercase"
                color={cyan[600]}
                {...(offer.productUrl && {
                  href: offer.productUrl,
                  display: 'inline',
                  isExternal: true,
                })}
              >
                {`🎁 ${offer.productName} ($${offer.productValue})`}
              </Box>
            )}
          </Text>
          <Text
            textStyle={['small', 'base']}
            color={gray[500]}
            textAlign="center"
            mb={4}
          >
            {`"${offer?.message}"`}
          </Text>
        </Flex>
      }
      variant="new"
      onClose={onClose}
      isOpen={isOpen}
      {...props}
    />
  )
}
