import { chakra as c, Container } from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import LinkButton from 'components/atoms/LinkButton'
import { NextPage } from 'next'
import { User } from 'shared/types'

interface Props {
  user: User
}

const CreateListingSuccess: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container py={9}>
        <c.h4 textStyle="h4" mb={6}>
          You&apos;ve created a listing!
        </c.h4>
        <c.h6 textStyle="base" mb={6}>
          Our team will review your submission and contact you in due time.
        </c.h6>
        <LinkButton href="/dashboard">Back to Dashboard</LinkButton>
      </Container>
    </Layout>
  )
}

export default CreateListingSuccess
