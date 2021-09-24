import { chakra as c, Container } from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { NextPage } from 'next'
import { User } from 'shared/types'

interface Props {
  user: User
}

const CreateOfferSuccess: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container py={[16, 20]}>
        <c.h4 textStyle="h4" mb={6}>
          Thanks for applying!
        </c.h4>
        <c.h6 textStyle="base" mb={6}>
          We’ll personally reach out and get you onboard if you’re a fit.
        </c.h6>
      </Container>
    </Layout>
  )
}

export default CreateOfferSuccess
