import { NextPage, GetServerSideProps } from 'next'
import { BRAND, UNVERIFIED } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandDashboard2 from 'components/templates/BrandDashboard2'
// import BrandDashboard from 'components/templates/BrandDashboard'
import CreatorDashboard from 'components/templates/CreatorDashboard'
import CreatorDashboardUnverified from 'components/templates/CreatorDashboardUnverified'

interface Props {
  user: User
}

const DashboardPage: NextPage<Props> = ({ user }: Props) => {
  if (user.role === BRAND) {
    return <BrandDashboard2 user={user} />
    // return <BrandDashboard user={user} />
  }
  // User === CREATOR

  if (user.status === UNVERIFIED) {
    return <CreatorDashboardUnverified user={user} />
  }

  return <CreatorDashboard user={user} />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/login')
  }

  return { props: { user } }
}

export default DashboardPage
