import { Avatar, Text, Box, Flex, FlexProps } from '@chakra-ui/react'
import { useColors } from 'utils/colors'
import { Activity } from 'shared/types'

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
            {`$${activity.price} by ${activity.brand.alias}`}
          </Text>
          <Text textStyle={['micro', 'mini']} mb={2} noOfLines={2}>
            {activity.price > 0 && `💰$${activity.price} + `}
            <Box as="span" color={cyan[600]}>
              🎁WH-1000MX4 Wireless noise cancelling headphones ($200)
            </Box>
          </Text>
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
