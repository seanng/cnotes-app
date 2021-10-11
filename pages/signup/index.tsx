import Layout from 'components/organisms/Layout'
import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  chakra as c,
  Text,
  Box,
  Button,
  AspectRatio,
  Container,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getUserPayload } from 'utils/auth'
import { CLOUDFRONT_URL } from 'shared/constants'
import { redirTo } from 'utils/helpers'
import { useColors } from 'hooks'

type LinkCardProps = {
  href: string
  label: string
  imgSrc: string
}

const Image = c(NextImage)

function LinkCard({ href, label, imgSrc }: LinkCardProps): JSX.Element {
  return (
    <LinkBox
      borderWidth={1}
      width={352}
      mx={4}
      borderRadius={'xl'}
      p={4}
      pb={6}
      textAlign={'center'}
      _hover={{
        shadow: '2xl',
      }}
    >
      <NextLink href={href} passHref>
        <LinkOverlay>
          <AspectRatio ratio={1} mb={5}>
            <Image
              borderRadius="xl"
              layout="fill"
              src={imgSrc}
              objectFit="contain"
            />
          </AspectRatio>
          <Button variant="outline" colorScheme="gray">
            {label}
          </Button>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

const SignupFoyer: NextPage = () => {
  const { gray } = useColors()
  return (
    <Layout>
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        py={[16, 20]}
      >
        <c.h2
          textStyle="h2"
          fontFamily="body"
          textTransform="capitalize"
          fontWeight={700}
          mb={6}
        >
          Sign up
        </c.h2>
        <Text color={gray[600]}>
          Select if you are a <c.span color={gray[900]}>creator</c.span> or a{' '}
          <c.span color={gray[900]}>brand</c.span>.
        </Text>
        <Box display={['block', 'flex']} pt={[16, 20]}>
          <LinkCard
            href="/signup/creator"
            imgSrc={`${CLOUDFRONT_URL}/assets/signup-cover-creator.jpg`}
            label="Creator"
          />
          <LinkCard
            href="/signup/brand"
            imgSrc={`${CLOUDFRONT_URL}/assets/signup-cover-brand.jpg`}
            label="Brand"
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default SignupFoyer

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Automatically navigate user to dashboard if already signed in
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  }
  return { props: {} }
}
