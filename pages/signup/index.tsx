import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
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

type LinkCardProps = {
  href: string
  label: string
  imgSrc: string
}

const SignupMutation = gql`
  mutation SignupMutation($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`

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
          <Button variant="outline">{label}</Button>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

function SignupPage(): JSX.Element {
  const [signup] = useMutation(SignupMutation)

  const handleSignup = async e => {
    e.preventDefault()
    try {
      await signup({
        variables: {
          // TODO: replace input
          input: {
            email: 'testabc@gmail.com',
            password: 'helloworld',
            firstName: 'sean',
            lastName: 'sean',
            role: 'CREATOR',
          },
        },
      })
    } catch (error) {
      console.log('error in handleSignup: ', error)
    }
  }

  return (
    <Layout>
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        py={[16, 20]}
      >
        <Box display="none">
          <Button onClick={handleSignup} />
        </Box>
        <c.h2 textStyle="h2" mb={6}>
          Sign up
        </c.h2>
        <Text color="neutrals4">
          Select if you are a <c.span color="neutrals1">creator</c.span> or a{' '}
          <c.span color="neutrals1">brand</c.span>.
        </Text>
        <Box display={['block', 'flex']} pt={[16, 20]}>
          <LinkCard
            href="/signup/creator"
            imgSrc="/signup-cover-creator.jpg"
            label="Creator"
          />
          <LinkCard
            href="/signup/brand"
            imgSrc="/signup-cover-brand.jpg"
            label="Brand"
          />
        </Box>
      </Container>
    </Layout>
  )
}

export default SignupPage
