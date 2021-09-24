import NextLink from 'next/link'
import {
  Grid,
  Container,
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

type Props = {
  profile: TransformedProfile
}

const ProfileReel = ({ profile }: Props): JSX.Element => {
  return (
    <Container pt={14}>
      <Text textStyle="h2" mb={5}>
        Content Reel
      </Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
                <NextLink href="#" passHref>
                  <LinkOverlay>
                    <Center
                      position="absolute"
                      opacity={0}
                      _hover={{ bgColor: 'rgba(0,0,0,0.5)', opacity: 1 }}
                      w="full"
                      h="full"
                    >
                      hello
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