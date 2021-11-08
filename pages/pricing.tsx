import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import html from 'components/static/pricing.html'

const PricingPage: NextPage = () => {
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_VERCEL_URL}/pricing`}
        />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  } else {
    return { props: {} }
  }
}

export default PricingPage
