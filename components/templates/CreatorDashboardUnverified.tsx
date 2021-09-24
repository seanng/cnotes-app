import { NextPage } from 'next'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { Box, chakra as c, Container } from '@chakra-ui/react'

interface Props {
  user: User
}

const CreatorDashboardUnverified: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container py={[16, 20]}>
        <c.h4 textStyle="h4" mb={6}>
          Learn how cnotes helps you get more sponsorships:
        </c.h4>
        <c.h6 textStyle="base" mb={6}>
          Ready to work with brands? Email michael.ninh@drop.com to get started!
        </c.h6>
        <Box my={10}>YouTube Embed goes here!!</Box>
      </Container>
    </Layout>
  )
}

export default CreatorDashboardUnverified
