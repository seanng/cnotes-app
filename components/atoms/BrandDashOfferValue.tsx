import { Text, Box, Tooltip, Icon } from '@chakra-ui/react'
import { Icon as Iconify } from '@iconify/react'

interface Props {
  offer: {
    cashValue?: number
    productValue?: number
  }
}

export default function BrandDashOfferValue({ offer }: Props): JSX.Element {
  return (
    <Text textStyle="largeBold">
      ${(offer.cashValue + offer.productValue).toLocaleString()}
      <Tooltip
        label={
          <>
            {offer.cashValue > 0 && (
              <Box as="span" mr={2}>
                {`💰$${offer.cashValue.toLocaleString()}`}
              </Box>
            )}
            {offer.productValue > 0 && (
              <Box as="span">{`🛍 $${offer.productValue.toLocaleString()}`}</Box>
            )}
          </>
        }
        hasArrow
        placement="top"
      >
        <Icon
          as={Iconify}
          mb={1}
          ml={1}
          icon="ant-design:info-circle-outlined"
          cursor="pointer"
        />
      </Tooltip>
    </Text>
  )
}
