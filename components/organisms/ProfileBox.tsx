import { Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { useTransposeColor } from 'hooks'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import { TransformedProfile } from 'shared/types'

type Props = {
  profile: TransformedProfile
}

const ProfileBox = ({ profile }: Props): JSX.Element => {
  return (
    <Box
      p={`${PROFILE_BOX_WRAPPER_PADDING}px`}
      mt={-40}
      bg={useTransposeColor('gray.0')}
      borderRadius="xl"
    >
      <Flex
        w={PROFILE_BOX_INNER_WIDTH}
        direction="column"
        alignItems="center"
        mx="auto"
      >
        <Avatar
          name={profile.alias}
          size="2xl"
          src={profile.avatarUrl}
          mb={5}
        />
        <Text color="gray.500" textStyle="micro">
          Joined 2 months ago
        </Text>
        <Text textStyle="h4">{profile.alias}</Text>
        <Text
          color={useTransposeColor('gray.700')}
          fontFamily="headingNew"
          fontSize="16px"
        >
          Mechanical Keyboard Reviewer
        </Text>
      </Flex>
    </Box>
  )
}

export default ProfileBox
