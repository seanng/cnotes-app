import { NextPage } from 'next'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import AwkwardPhoto from 'components/molecules/AwkwardPhoto'
import { Container, Text } from '@chakra-ui/react'

interface Props {
  user: User
}

const UnverifiedState: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container pt={9}>
        <Text mb={8} textStyle="h4body">
          Your account has not yet been verified.
        </Text>
        <Text textStyle="base" mb={4}>
          Please check your email inbox (or spam folder) for instructions on
          getting verified.
        </Text>
        <AwkwardPhoto />
      </Container>
    </Layout>
  )
}

export default UnverifiedState
