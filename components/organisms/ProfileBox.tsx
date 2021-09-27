import { formatDistanceToNow } from 'date-fns'
import {
  Icon,
  Divider,
  Tooltip,
  SimpleGrid,
  Avatar,
  Flex,
  Box,
  FlexProps,
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
import { CREATOR } from 'shared/constants'

type Props = {
  profile: TransformedProfile
}

const Social = ({ profile, ...props }: Props & FlexProps): JSX.Element => {
  const { tiktokUrl, youtubeUrl, instagramUrl, facebookUrl } = profile

  return (
    <Flex align="center" {...props}>
      {tiktokUrl && (
        <a href={tiktokUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="bx:bxl-tiktok"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {youtubeUrl && (
        <a href={youtubeUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="akar-icons:youtube-fill"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {instagramUrl && (
        <a href={instagramUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="ant-design:instagram-filled"
            height="18px"
            width="18px"
          />
        </a>
      )}
      {facebookUrl && (
        <a href={facebookUrl} target="_blank" rel="noreferrer">
          <Icon
            mx={2}
            as={Iconify}
            icon="bx:bxl-facebook"
            height="18px"
            width="18px"
          />
        </a>
      )}
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

const StatNumbers = ({ data, ...props }) => {
  const { gray } = useColors()
  const stats = [
    { key: 'verifiedCollabsCount' },
    { key: 'followerCount' },
    { key: 'avgImpressions', helpText: 'Total Views / Total Videos' },
    { key: 'avgEngagement', helpText: 'Total Comments / Total Views' },
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
            {data.filter(({ key }) => key === stat.key)[0]?.value || '-'}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}

const ProfileBox = ({ profile }: Props): JSX.Element => {
  const { gray } = useColors()
  const genderChart = profile.creatorStats?.filter(
    ({ key }) => key === 'genderBreakdown'
  )[0]
  const locationChart = profile.creatorStats?.filter(
    ({ key }) => key === 'locationBreakdown'
  )[0]

  return (
    <Flex
      w={`${2 * PROFILE_BOX_WRAPPER_PADDING + PROFILE_BOX_INNER_WIDTH}px`}
      pt={`${PROFILE_BOX_WRAPPER_PADDING}px`}
      mt={-40}
      direction="column"
      align="center"
      bg={gray[0]}
      borderRadius="xl"
    >
      <Avatar name={profile.alias} size="2xl" src={profile.avatarUrl} mb={7} />
      <Text color="gray.500" textStyle="micro" mb={1}>
        {`Joined ${formatDistanceToNow(new Date(profile.createdAt))} ago`}
      </Text>
      <Text textStyle="h4" mb={2}>
        {profile.alias}
      </Text>
      <Text color={gray[1000]} textStyle="micro" fontWeight={500} mb={3}>
        {profile.genre || ''}
      </Text>
      <Social profile={profile} mb={8} />
      {profile.role === CREATOR && (
        <>
          <Divider mb={8} opacity={0.4} />
          <Box px={`${PROFILE_BOX_WRAPPER_PADDING}px`} pb={5}>
            <StatNumbers data={profile.creatorStats} mb={10} />
            {genderChart?.value && (
              <GenderChart mb={10} data={genderChart?.value} />
            )}
            {locationChart?.value && (
              <LocationChart data={locationChart.value} />
            )}
            {profile.statsLastVerifiedAt && (
              <Text color={gray[500]} textStyle="micro" fontWeight={600}>
                *Stats were last verified
                <Box as="span" color={gray[900]}>
                  {` ${formatDistanceToNow(
                    new Date(profile.statsLastVerifiedAt)
                  )} ago`}
                </Box>
              </Text>
            )}
          </Box>
        </>
      )}
    </Flex>
  )
}

export default ProfileBox
