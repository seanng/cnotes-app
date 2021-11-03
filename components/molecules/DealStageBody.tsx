import { Box, Container, Text } from '@chakra-ui/react'
import LinkText from 'components/atoms/LinkText'
import StageHeading from 'components/molecules/StageHeading'
import { ReactNode } from 'react'
import { Deal } from 'shared/types'
import { useColors } from 'hooks'

interface Props {
  deal: Deal
  children: ReactNode
}

const CONTAINER_WIDTH = 600

export default function DealStageBody({ deal, children }: Props): JSX.Element {
  const { cyan, gray } = useColors()
  const totalValue = deal.productValue + deal.cashValue
  return (
    <>
      <StageHeading data={deal} specs={deal.listing.specs} />
      <Container my={6}>
        <Text textStyle="h4" mb={5}>
          offer details
        </Text>
        <Box
          borderRadius="xl"
          bgColor={gray[100]}
          p={5}
          maxWidth={CONTAINER_WIDTH}
          mb={10}
        >
          <Text textStyle={['large', 'xLarge']} fontWeight={700} mb={[2, 4]}>
            {`$${totalValue.toLocaleString()}`}
          </Text>
          <Box textStyle={['mini', 'small']} mb={[2, 4]}>
            {deal.cashValue > 0 && (
              <>
                <Box as="span" mr={1}>
                  💰
                </Box>
                <Box as="span" mr={3}>
                  ${deal.cashValue.toLocaleString()}
                </Box>
              </>
            )}
            {deal.productName && (
              <>
                <Box as="span" mr={2}>
                  🎁
                </Box>
                <Box
                  as={deal.productUrl ? LinkText : 'span'}
                  color={cyan[600]}
                  {...(deal.productUrl && {
                    href: deal.productUrl,
                    display: 'inline',
                    isExternal: true,
                  })}
                >
                  {`${
                    deal.productName
                  } ($${deal.productValue.toLocaleString()})`}
                </Box>
              </>
            )}
          </Box>
          <Text textStyle={['small', 'base']} color={gray[600]} mb={[2, 4]}>
            {`"${deal.message}"`}
          </Text>
        </Box>
        <Text textStyle="h4" mb={5}>
          submission
        </Text>
        <Box maxWidth={CONTAINER_WIDTH}>{children}</Box>
      </Container>
    </>
  )
}
