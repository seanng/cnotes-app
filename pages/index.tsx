import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import html from 'components/static/index.html'

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_VERCEL_URL}`} />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>

    // <Layout>
    //   <Head>
    //     <link rel="canonical" href={process.env.NEXT_PUBLIC_VERCEL_URL} />
    //   </Head>
    //   <div>landing page goes here..</div>
    // </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  } else {
    return { props: {} }
  }
}

export default IndexPage
