import { NextPage, GetServerSideProps } from 'next'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

const DashboardPage: NextPage = props => {
  console.log('props: ', props)
  return (
    <div>
      <p>
        eventually, we will remove /dashboard-creator and /dashboard-brand and
        render the appropriate template for that user type.
      </p>
      <p>for now, this is just a placeholder page.</p>
    </div>
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
