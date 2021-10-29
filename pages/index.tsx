import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Layout from 'components/organisms/Layout'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

const IndexPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_VERCEL_URL} />
      </Head>
      <div>landing page goes here..</div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (getUserPayload(ctx.req.headers?.cookie)) {
    redirTo('/dashboard')
  } else {
    return { props: {} }
  }
}

export default IndexPage
