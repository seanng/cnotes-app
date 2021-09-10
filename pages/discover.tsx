import { Container } from '@chakra-ui/react'
import Layout from 'components/organisms/Layout'
import { GetServerSideProps, NextPage } from 'next'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

type Props = {
  user: User
}

const DiscoverPage: NextPage<Props> = ({ user }: Props) => {
  return (
    <Layout user={user}>
      <Container>discover page yo</Container>
    </Layout>
  )
}

export default DiscoverPage

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}
