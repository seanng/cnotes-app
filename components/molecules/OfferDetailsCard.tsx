import { Avatar, Text, Box, Flex, FlexProps } from '@chakra-ui/react'
import { useColors } from 'utils/colors'
import { Activity } from 'shared/types'
import LinkText from 'components/atoms/LinkText'

type Props = {
  shouldShowViewMore?: boolean
  activity: Activity
} & FlexProps

export default function OfferDetailsCard({
  activity,
  shouldShowViewMore,
  ...props
}: Props): JSX.Element {
  const { gray, cyan } = useColors()
  const totalValue = activity.productValue + activity.cashValue
  return (
    <Flex
      borderRadius="xl"
      bgColor={gray[0]}
      boxShadow="sm"
      maxWidth={700}
      p={5}
      {...props}
    >
      <Avatar size="xl" src={activity.brand.avatarUrl} mr={5} />
      <Box
        w="full"
        display={['block', null, 'flex']}
        justifyContent="space-between"
      >
        <Box maxW={420} mb={[2, 4]}>
          <Text
            textStyle={['base', 'large']}
            fontWeight={700}
            mb={2}
            isTruncated
          >
            {/* TODO: change to total value */}
            {`$${totalValue} by ${activity.brand.alias}`}
          </Text>
          <Box textStyle={['micro', 'mini']} mb={2}>
            {activity.cashValue > 0 && (
              <Box as="span" mr={3}>
                💰${activity.cashValue}
              </Box>
            )}
            {activity.productName && (
              <Box
                as={activity.productUrl ? LinkText : 'span'}
                color={cyan[600]}
                {...(activity.productUrl && {
                  href: activity.productUrl,
                  display: 'inline',
                })}
              >
                {`🎁 ${activity.productName} ($${activity.productValue})`}
              </Box>
            )}
          </Box>
          <Text
            textStyle={['mini', 'small']}
            color={gray[500]}
            noOfLines={[1, 2]}
          >
            {`"${activity.message}"`}
          </Text>
        </Box>
        {shouldShowViewMore && (
          <Flex
            textStyle={['micro', 'mini']}
            color={cyan[600]}
            justify="flex-end"
            align="flex-end"
          >
            VIEW MORE
          </Flex>
        )}
      </Box>
    </Flex>
  )
}
