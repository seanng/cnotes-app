import { NextPage } from 'next'
import { User } from 'shared/types'
import Layout from 'components/organisms/Layout'
import { Container } from '@chakra-ui/react'

interface Props {
  user: User
}

const CreatorDashboard: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container>This appears if the user is verified</Container>
    </Layout>
  )
}

export default CreatorDashboard
