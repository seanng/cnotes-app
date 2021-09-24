import { format } from 'date-fns'
import NextLink from 'next/link'
import {
  Grid,
  Button,
  Flex,
  Container,
  Tag,
  GridItem,
  LinkBox,
  LinkOverlay,
  Text,
  Center,
  Image,
  AspectRatio,
} from '@chakra-ui/react'
import { TransformedProfile } from 'shared/types'
import { TIKTOK } from 'shared/constants'
import IsVerifiedTag from 'components/atoms/IsVerifiedTag'
import { useColors } from 'utils/colors'

type Props = {
  profile: TransformedProfile
}

const ProfileReel = ({ profile }: Props): JSX.Element => {
  const { green } = useColors()
  return (
    <Container py={[4, null, 14]}>
      <Text textStyle="h2" mb={5}>
        Content Reel
      </Text>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']} gap={6}>
        {profile.portfolio.map((item, i) => (
          <AspectRatio
            key={i}
            ratio={item.platform === TIKTOK ? 9 / 16 : 640 / 480}
          >
            <GridItem
              colSpan={[3, 2, 1]}
              rowSpan={item.platform === TIKTOK ? 2 : 1}
              borderRadius="xl"
            >
              <LinkBox position="relative">
                <NextLink href={item.url || '#'} passHref>
                  <LinkOverlay>
                    <Flex
                      direction={[
                        'row-reverse',
                        'column-reverse',
                        null,
                        'row-reverse',
                      ]}
                      justify="space-between"
                      position="absolute"
                      p={3}
                      w="full"
                      h="full"
                      alignItems="flex-start"
                    >
                      {item.companyName && (
                        <Flex
                          direction={['row', 'column', null, 'row']}
                          alignItems="flex-start"
                        >
                          <Tag variant="reel" mr={1} mb={1}>
                            {item.companyName}
                          </Tag>
                          <Tag variant="reel" mb={1}>
                            {item.deliverable}
                          </Tag>
                        </Flex>
                      )}
                      {item.isVerified && (
                        <Tag variant="reel" bgColor={green[600]}>
                          <IsVerifiedTag color="black" />
                        </Tag>
                      )}
                    </Flex>
                    <Center
                      position="absolute"
                      opacity={0}
                      _hover={{ bgColor: 'rgba(0,0,0,0.7)', opacity: 1 }}
                      w="full"
                      h="full"
                    >
                      <Flex alignItems="center" direction="column">
                        <Center
                          borderRadius="full"
                          bgColor="white"
                          height="30px"
                          width="30px"
                          mb={3}
                        >
                          <Image
                            src={`/logos/${item.platform}.png`}
                            width="20px"
                            height={
                              item.platform === 'youtube' ? '15px' : '20px'
                            }
                          />
                        </Center>
                        {item.companyName && (
                          <Text
                            color="white"
                            fontSize="20px"
                            fontWeight="bold"
                          >{`${item.deliverable} for ${item.companyName}`}</Text>
                        )}
                        <Text
                          textStyle="base"
                          mb={5}
                          fontWeight="medium"
                          color="white"
                        >
                          {format(new Date(item.publishedAt), 'dd LLLL yyyy')}
                        </Text>
                        <Button
                          size="sm"
                          bgColor="white"
                          color="gray.900"
                          type="button"
                          textTransform="uppercase"
                          fontWeight="bold"
                          // mb={5} TODO: uncomment
                        >
                          Play Video
                        </Button>
                        {/* TODO: add video stats. */}
                      </Flex>
                    </Center>
                  </LinkOverlay>
                </NextLink>
                <Image
                  src={item.thumbnailUrl}
                  alt="thumbnail"
                  w="full"
                  h="full"
                />
              </LinkBox>
            </GridItem>
          </AspectRatio>
        ))}
      </Grid>
    </Container>
  )
}
export default ProfileReel
