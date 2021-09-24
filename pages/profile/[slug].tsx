import { gql } from '@apollo/client'
import Image from 'next/image'
import { Box, Center, Flex, Text, Container, Icon } from '@chakra-ui/react'
import { useTransposeColor, useColors } from 'hooks'
import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { User, TransformedProfile } from 'shared/types'
import { PLACEHOLDER_BANNER_URL } from 'shared/constants'
import client from 'lib/apollo-client'
import { getUserPayload } from 'utils/auth'
import {
  NAVBAR_HEIGHT,
  PROFILE_BOX_INNER_WIDTH,
  PROFILE_BOX_WRAPPER_PADDING,
} from 'shared/metrics'
import { format } from 'date-fns'
import ProfileBox from 'components/organisms/ProfileBox'
import { Icon as Iconify } from '@iconify/react'
import ProfileReel from 'components/organisms/ProfileReel'

const PROFILE_BY_SLUG = gql`
  query profileBySlug($slug: String!) {
    profileBySlug(slug: $slug) {
      id
      description
      portfolio
      alias
      slug
      bannerUrl
      avatarUrl
      createdAt
    }
  }
`

type Props = {
  profile: TransformedProfile
  user: User
}

const toCssVar = (colorCode: string) => {
  const [color, hue] = colorCode.split('.')
  return `var(--chakra-colors-${color}-${hue})`
}

const ProfilePage: NextPage<Props> = ({ profile, user }: Props) => {
  const bgImage = profile.bannerUrl || PLACEHOLDER_BANNER_URL
  const profileBodyWidth = `calc(100% - ${PROFILE_BOX_INNER_WIDTH}px - ${PROFILE_BOX_WRAPPER_PADDING}px)`
  const bannerBgColor = toCssVar(useTransposeColor('gray.50'))
  const { gray } = useColors()

  return (
    <Layout user={user}>
      <Box
        h={408}
        mt={NAVBAR_HEIGHT * -1}
        w="100%"
        bgImage={`linear-gradient(${bannerBgColor} 0%, transparent 50%, ${bannerBgColor} 100%), url(${bgImage})`}
        bgSize="cover"
      />
      <Container display={{ md: 'flex' }} maxWidth={1280}>
        <ProfileBox profile={profile} />
        <Box width={profileBodyWidth} pl={[0, null, 20]} mt={-8}>
          <Text textStyle="h2" mb={3}>
            About
          </Text>
          <Text textStyle="base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            facilisis congue a libero neque, bibendum arcu. Integer habitasse
            augue vestibulum nibh a metus nulla. Lectus adipiscing magnis eu
            donec vestibulum. Sit faucibus nisl luctus suscipit gravida.
          </Text>
          <Text textStyle="h2" mt={10} mb={7}>
            Collabs
          </Text>
          {profile?.collabs.map(collab => (
            <Flex key={collab.platformMediaId} align="center" mb={7}>
              <Center
                borderRadius="full"
                bgColor="black"
                height="50px"
                width="50px"
                mr={5}
              >
                <Image
                  src={`/logos/${collab.platform}.png`}
                  width="20px"
                  height={collab.platform === 'youtube' ? '15px' : '20px'}
                />
              </Center>
              <Flex direction="column">
                <Flex textStyle="base" mb={1}>
                  <Text fontWeight={600}>{collab.deliverable}</Text>
                  <Text color={gray[600]}>&nbsp;for&nbsp;</Text>
                  <Text fontWeight={600}>{collab.companyName}</Text>
                  <Text textStyle="micro" color="green.400" fontWeight={600}>
                    <Icon
                      as={Iconify}
                      ml={2}
                      mr={1}
                      icon="akar-icons:circle-check-fill"
                    />
                    cnotes verified
                  </Text>
                </Flex>
                <Text textStyle="small" color={gray[600]}>
                  {format(new Date(collab.publishedAt), 'dd LLLL yyyy')}
                </Text>
              </Flex>
            </Flex>
          ))}
          {/* <Text>{JSON.stringify(profile)}</Text> */}
        </Box>
      </Container>
      <ProfileReel profile={profile} />
    </Layout>
  )
}

export default ProfilePage

function profileTransformer(data: User): TransformedProfile {
  const portfolio = data.portfolio
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).valueOf() - new Date(a.publishedAt).valueOf()
    )

  return {
    ...data,
    portfolio,
    collabs: portfolio.filter(item => !!item.companyName),
  }
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    data: { profileBySlug: data },
  } = await client.query({
    query: PROFILE_BY_SLUG,
    variables: { slug: ctx.params.slug },
  })
  const user = getUserPayload(ctx.req.headers.cookie)
  return { props: { profile: profileTransformer(data), user } }
}
