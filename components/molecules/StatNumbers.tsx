import {
  Icon,
  Tooltip,
  SimpleGrid,
  Box,
  SimpleGridProps,
  Text,
} from '@chakra-ui/react'
import { CreatorStats } from 'shared/types'
import { useColors } from 'hooks'
import { Icon as Iconify } from '@iconify/react'

type StatNumbersProps = {
  data: CreatorStats
} & SimpleGridProps

function formatStatTitle(key: string): string {
  const map = {
    followerCount: '# of followers',
    verifiedCollabsCount: 'Verified Collabs',
    avgImpressions: 'Avg Impressions',
    avgEngagement: 'Avg Engagement',
  }
  return map[key] || key
}

export default function StatNumbers({
  data,
  ...props
}: StatNumbersProps): JSX.Element {
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
            {data?.[stat.key] || '-'}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  )
}