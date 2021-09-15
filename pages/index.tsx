import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import { Container, Text } from '@chakra-ui/react'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Text>this is where the landing page will go.</Text>
        <Text>
          if user is authenticated, (s)he will be automatically redirected to
          /dashboard (using getServerSideProps).
        </Text>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  }
  return { props: {} }
}

export default IndexPage
