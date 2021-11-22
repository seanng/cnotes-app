import Head from 'next/head'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import {
  chakra as c,
  IconButton,
  Box,
  Button,
  Flex,
  Center,
  Container,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import { useColors } from 'hooks'

const cloudfrontUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URL

type LinkCardProps = {
  href: string
  label: string
  imgSrc: string
}

const Link = c(NextLink)

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
          <Center h="300px">
            <NextImage src={imgSrc} height="225px" width="225px" />
          </Center>
          <Button variant="outline" colorScheme="gray">
            {label}
          </Button>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

const SignupFoyer: NextPage = () => {
  const { blue } = useColors()
  const router = useRouter()
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        py={[10, 16]}
      >
        <Flex mb={6} align="center">
          <IconButton
            size="lg"
            fontSize="24px"
            variant="unstyled"
            colorScheme="gray"
            icon={<ArrowBackIcon />}
            aria-label="back"
            mr={2}
            ml={-4}
            onClick={(): void => {
              router.back()
            }}
          />
          <c.h2 textStyle="h2body">Sign up</c.h2>
        </Flex>
        <Flex justify="center" textStyle="small">
          <Box mr={2}>Already have an account?</Box>
          <Box color={blue[600]} fontWeight={600}>
            <Link href="/login">Sign in</Link>
          </Box>
        </Flex>
        <Box display={['block', 'flex']} pt={[10, 16]}>
          <LinkCard
            href="/signup/creator"
            imgSrc={`${cloudfrontUrl}/assets/signup-cover-creator.png`}
            label="Creator"
          />
          <LinkCard
            href="/signup/brand"
            imgSrc={`${cloudfrontUrl}/assets/signup-cover-brand.png`}
            label="Brand"
          />
        </Box>
      </Container>
    </>
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
