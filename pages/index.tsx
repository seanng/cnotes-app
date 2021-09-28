import { GetServerSideProps, NextPage } from 'next'
import Layout from 'components/organisms/Layout'
import LandingTemp from 'components/templates/LandingTemp'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <LandingTemp />
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
