import { format } from 'date-fns'
import {
  Grid,
  Button,
  Flex,
  Icon,
  Tag,
  Link,
  Box,
  GridItem,
  LinkBox,
  LinkOverlay,
  Text,
  Center,
  Image,
  AspectRatio,
  GridProps,
} from '@chakra-ui/react'
import { TransformedProfile } from 'shared/types'
import { TIKTOK, YOUTUBE } from 'shared/constants'
import IsVerifiedTag from 'components/atoms/IsVerifiedTag'
import { platformIconSlugs } from 'utils/configs'
import { Icon as Iconify } from '@iconify/react'
import { useColors } from 'hooks'
import { formatCountNumber } from 'utils/helpers'

type Props = {
  profile: TransformedProfile
  gridProps?: GridProps
}

const ProfileReel = ({ profile, gridProps }: Props): JSX.Element => {
  const { green, gray } = useColors()
  return (
    <>
      <Text textStyle="profileSectionHeading" mb={5}>
        Content Reel
      </Text>
      <Grid
        templateColumns={[
          'repeat(1, 1fr)',
          null,
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
        ]}
        gap={6}
        {...gridProps}
      >
        {profile.portfolio.map((item, i) => (
          <GridItem
            key={i}
            colSpan={1}
            rowSpan={item.platform === TIKTOK ? 2 : 1}
          >
            <AspectRatio ratio={item.platform === TIKTOK ? 9 / 16 : 16 / 9}>
              <LinkBox position="relative" borderRadius="xl">
                <LinkOverlay href={item.url} isExternal>
                  {item.isVerified && (
                    <Tag
                      bgColor={green[600]}
                      position="absolute"
                      left={3}
                      top={3}
                      minHeight="12px"
                    >
                      <IsVerifiedTag color="black" />
                    </Tag>
                  )}
                  {/* Video Hover State */}
                  <Center
                    position="absolute"
                    top={0}
                    opacity={0}
                    _hover={{ bgColor: 'rgba(0,0,0,0.7)', opacity: 1 }}
                    w="full"
                    h="full"
                  >
                    <Flex alignItems="center" direction="column">
                      {/* <Center
                        borderRadius="full"
                        bgColor="white"
                        height="30px"
                        width="30px"
                        mb={3}
                      >
                        <Image
                          src={`/logos/${item.platform}.png`}
                          width="20px"
                          height={item.platform === 'youtube' ? '15px' : '20px'}
                        />
                      </Center> */}
                      {item.companyName && (
                        <Text
                          color="white"
                          fontSize="20px"
                          fontWeight={700}
                        >{`${item.deliverable} for ${item.companyName}`}</Text>
                      )}
                      <Text
                        textStyle="base"
                        mb={5}
                        fontWeight={500}
                        color="white"
                      >
                        {item.publishedAt &&
                          format(new Date(item.publishedAt), 'dd LLLL yyyy')}
                      </Text>
                      <Button
                        size="sm"
                        bgColor="white"
                        color="gray.900"
                        type="button"
                        textTransform="uppercase"
                        fontWeight={700}
                        mb={5}
                      >
                        Play Video
                      </Button>
                      <Flex>
                        {item.viewCount && (
                          <Flex color="yellow.500" align="center">
                            <Icon as={Iconify} icon="carbon:view" mr={1} />
                            {formatCountNumber(item.viewCount)}
                          </Flex>
                        )}
                        {item.rating && (
                          <Flex align="center" color="green.500" mx={2}>
                            <Icon
                              as={Iconify}
                              icon="ant-design:like-outlined"
                              mr={1}
                            />
                            {item.platform === YOUTUBE
                              ? `${item.rating}%`
                              : formatCountNumber(item.likeCount)}
                          </Flex>
                        )}
                        {/* <Flex color="cyan.600">
                          <Icon as={Iconify} icon="fa-regular:comment" />
                          {item.engagementRate}%
                        </Flex> */}
                      </Flex>
                    </Flex>
                  </Center>
                </LinkOverlay>
                <Image
                  src={item.thumbnailUrl}
                  fit="cover"
                  alt="thumbnail"
                  w="full"
                  h="full"
                />
              </LinkBox>
            </AspectRatio>
            <Box textStyle="base" mt={3} mb={5} display="inline-block">
              <Icon
                mr={2}
                as={Iconify}
                icon={platformIconSlugs[item.platform]}
                fontSize="20px"
                mb="2px"
              />
              <Box
                as="span"
                fontWeight={600}
                {...(item.url && {
                  as: Link,
                  href: item.url,
                  isExternal: true,
                })}
              >
                {item.deliverable || 'Original Content'}
              </Box>
              {item.companyName && (
                <>
                  <Text as="span" color={gray[600]}>
                    &nbsp;for&nbsp;
                  </Text>
                  <Box
                    as="span"
                    fontWeight={600}
                    {...(item.companyUrl && {
                      as: Link,
                      href: item.companyUrl,
                      isExternal: true,
                    })}
                  >
                    {item.companyName}
                  </Box>
                </>
              )}
            </Box>
          </GridItem>
        ))}
      </Grid>
    </>
  )
}
export default ProfileReel
