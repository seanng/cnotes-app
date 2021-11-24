import * as Sentry from '@sentry/nextjs'
import { withApollo } from 'lib/apollo-client'
import { NextPage, GetServerSideProps } from 'next'
import { BRAND, UNVERIFIED } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandDashboard from 'components/templates/BrandDashboard'
import CreatorDashboard from 'components/templates/CreatorDashboard'
import UnverifiedState from 'components/templates/UnverifiedState'

interface Props {
  user: User
}

const DashboardPage: NextPage<Props> = ({ user }: Props) => {
  if (user.role === BRAND) {
    return <BrandDashboard user={user} />
  }

  if (user.status === UNVERIFIED) {
    return <UnverifiedState user={user} />
  }

  return <CreatorDashboard user={user} />
}

export default withApollo(DashboardPage)

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req?.headers?.cookie)
  if (!user) {
    Sentry.configureScope(scope => scope.setUser(null))
    return redirTo('/login')
  }
  Sentry.setUser(user)
  return { props: { user } }
}
