import { NextPage, GetServerSideProps } from 'next'
import { BRAND } from 'shared/constants'
import { User } from 'shared/types'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'
import BrandDashboard from 'components/templates/BrandDashboard'
import CreatorDashboard from 'components/templates/CreatorDashboard'
import Layout from 'components/organisms/Layout'

interface Props {
  user: User
}

const DashboardPage: NextPage<Props> = ({ user }: Props) => {
  const Dashboard = user.role === BRAND ? BrandDashboard : CreatorDashboard

  return (
    <Layout user={user}>
      <Dashboard />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req.headers.cookie)
  if (!user) {
    return redirTo('/')
  }

  return { props: { user } }
}

export default DashboardPage
