import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/router'
import { NextPage, GetServerSideProps } from 'next'
import { withApollo } from 'lib/apollo-client'
// import { BRAND } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
// import BrandDeal from 'components/templates/BrandDeal'
import CreatorDeal from 'components/templates/CreatorDeal'

interface Props {
  user: User
}

const DealPage: NextPage<Props> = ({ user }: Props) => {
  const {
    query: { dealId },
  } = useRouter()

  // if (user.role === BRAND) {
  //   return <BrandDeal user={user} dealId={dealId as string} />
  // }

  return <CreatorDeal user={user} dealId={dealId as string} />
}

export default withApollo(DealPage)

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }
  Sentry.setUser(user)
  return { props: { user } }
}
