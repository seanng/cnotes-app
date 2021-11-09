import { Avatar, Text, Box, Flex, FlexProps } from '@chakra-ui/react'
import { useColors } from 'hooks'
import { Activity } from 'shared/types'
import { CREATOR_DASH_DETAILS_CARD_WIDTH } from 'shared/metrics'
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
  const totalValue = activity.productMSRP + activity.cashValue
  return (
    <Flex
      borderRadius="xl"
      bgColor={gray[0]}
      boxShadow="sm"
      maxWidth={CREATOR_DASH_DETAILS_CARD_WIDTH}
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
            noOfLines={1}
          >
            {`$${totalValue.toLocaleString()} by ${activity.brand.alias}`}
          </Text>
          <Box textStyle={['micro', 'mini']} mb={2}>
            {activity.cashValue > 0 && (
              <>
                <Box as="span" mr={2}>
                  💰
                </Box>
                <Box as="span" mr={3}>
                  ${activity.cashValue.toLocaleString()}
                </Box>
              </>
            )}
            {activity.productName && (
              <>
                <Box as="span" mr={2}>
                  🎁
                </Box>
                <Box
                  as="span"
                  display="inline"
                  {...(activity.productUrl &&
                    !props.onClick && {
                      as: LinkText,
                      isExternal: true,
                      color: cyan[600],
                      href: activity.productUrl,
                    })}
                >
                  {`${
                    activity.productName
                  } ($${activity.productMSRP.toLocaleString()})`}
                </Box>
              </>
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
