import { formatDistanceToNow } from 'date-fns'
import {
  Icon,
  Tooltip,
  SimpleGrid,
  Avatar,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react'
import { useColors } from 'utils/colors'
import {
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import { TransformedProfile } from 'shared/types'
import GenderChart from 'components/atoms/GenderChart'
import LocationChart from 'components/atoms/LocationChart'
import { Icon as Iconify } from '@iconify/react'

type Props = {
  profile: TransformedProfile
}

const Social = ({ ...props }) => {
  return (
    <Flex align="center" {...props}>
      <Icon
        mx={2}
        as={Iconify}
        icon="bx:bxl-tiktok"
        height="18px"
        width="18px"
      />
      <Icon
        mx={2}
        as={Iconify}
        icon="akar-icons:youtube-fill"
        height="18px"
        width="18px"
      />
      <Icon
        mx={2}
        as={Iconify}
        icon="ant-design:instagram-filled"
        height="18px"
        width="18px"
      />
      <Icon
        mx={2}
        as={Iconify}
        icon="bx:bxl-facebook"
        height="18px"
        width="18px"
      />
    </Flex>
  )
}

function formatStatTitle(key: string): string {
  const map = {
    followerCount: '# of followers',
    verifiedCollabsCount: 'Verified Collabs',
    avgImpressions: 'Avg Impressions',
    avgEngagement: 'Avg Engagement',
  }
  return map[key] || key
}

const StatNumbers = ({ ...props }) => {
  const { gray } = useColors()
  const stats = [
    { key: 'verifiedCollabsCount', value: '15' },
    { key: 'followerCount', value: '250k' },
    {
      key: 'avgImpressions',
      value: '263k',
      helpText: 'Total Views / Total Videos',
    },
    {
      key: 'avgEngagement',
      value: '50%',
      helpText: 'Total Comments / Total Views',
    },
  ]
  return (
    <SimpleGrid columns={2} spacingX={8} spacingY={5} {...props}>
      {stats.map(stat => (
        <Box key={stat.key}>
          <Text textStyle="micro" color={gray[600]}>
            {formatStatTitle(stat.key)}
            {stat.helpText && (
              <Tooltip label={stat.helpText} hasArrow placement="top">
                <Icon ml={1} mb={1} as={Iconify} icon="bx:bxs-help-circle" />
              </Tooltip>
            )}
          </Text>
          <Text textStyle="h4" fontSize={26} color={gray[1000]}>
            {stat.value || '-'}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

const ProfileBox = ({ profile }: Props): JSX.Element => {
  const { gray } = useColors()
  return (
    <Box
      p={`${PROFILE_BOX_WRAPPER_PADDING}px`}
      mt={-40}
      bg={gray[0]}
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
          mb={7}
        />
        <Text color="gray.500" textStyle="micro" mb={1}>
          {`Joined ${formatDistanceToNow(new Date(profile.createdAt))} ago`}
        </Text>
        <Text textStyle="h4" mb={1}>
          {profile.alias}
        </Text>
        <Text color={gray[1000]} textStyle="micro" fontWeight={500} mb={4}>
          {profile.genre || ''}
        </Text>
        <Social mb="60px" />
        <StatNumbers />
        <GenderChart my={10} />
        <LocationChart />
      </Flex>
    </Box>
  )
}

export default ProfileBox
