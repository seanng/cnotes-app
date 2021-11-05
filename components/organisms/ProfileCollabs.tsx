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
      <Text textStyle="profileSectionHeading" mt={10} mb={7}>
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
              alt={collab.platform}
            />
          </Center>
          <Flex direction="column">
            <Box textStyle="base" mb={1} display="inline-block">
              <Box
                as="span"
                fontWeight={600}
                {...(collab.url && {
                  as: Link,
                  href: collab.url,
                  isExternal: true,
                })}
              >
                {collab.deliverable}
              </Box>
              <Text as="span" color={gray[600]}>
                &nbsp;for&nbsp;
              </Text>
              <Box
                as="span"
                fontWeight={600}
                mr={2}
                {...(collab.companyUrl && {
                  as: Link,
                  href: collab.companyUrl,
                  isExternal: true,
                })}
              >
                {collab.companyName}
              </Box>
              {collab.isVerified && <IsVerifiedTag float="right" />}
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
