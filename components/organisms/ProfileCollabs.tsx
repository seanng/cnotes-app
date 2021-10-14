import IsVerifiedTag from 'components/atoms/IsVerifiedTag'
import { format } from 'date-fns'
import Image from 'next/image'
import { Box, BoxProps, Center, Flex, Text, Link } from '@chakra-ui/react'
import { useColors } from 'hooks'
import { PortfolioItem } from 'shared/types'

interface Props extends BoxProps {
  collabs: PortfolioItem[]
}

export default function ProfileCollabs({
  collabs,
  ...props
}: Props): JSX.Element {
  const { gray } = useColors()
  return (
    <Box {...props}>
      <Text textStyle={['h3', 'h2']} mt={10} mb={7}>
        Collabs
      </Text>
      {collabs.map(collab => (
        <Flex key={collab.platformMediaId} align="center" mb={7}>
          <Center
            borderRadius="full"
            bgColor="black"
            height="50px"
            width="50px"
            minWidth="50px"
            mr={5}
          >
            <Image
              src={`/logos/${collab.platform}.png`}
              width="20px"
              height={collab.platform === 'youtube' ? '15px' : '20px'}
            />
          </Center>
          <Flex direction="column">
            <Box textStyle="base" mb={1} display="inline-block">
              <Text as="span" fontWeight={600}>
                <Link href={collab.url}>{collab.deliverable}</Link>
              </Text>
              <Text as="span" color={gray[600]}>
                &nbsp;for&nbsp;
              </Text>
              <Text as="span" fontWeight={600} mr={2}>
                <Link href={collab.companyUrl}>{collab.companyName}</Link>
              </Text>
              {collab.isVerified && <IsVerifiedTag />}
            </Box>
            <Text textStyle="small" color={gray[600]}>
              {collab.publishedAt &&
                format(new Date(collab.publishedAt), 'dd LLLL yyyy')}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  )
}
