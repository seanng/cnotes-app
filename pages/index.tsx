import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Layout from 'components/organisms/Layout'
import { Box, Container, Text } from '@chakra-ui/react'
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
        <Box my={2}>
          <Link href="/dashboard-creator"> -&gt; Dashboard (creator)</Link>
        </Box>
        <Box my={2}>
          <Link href="/dashboard-brand"> -&gt; Dashboard (brand)</Link>
        </Box>
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
