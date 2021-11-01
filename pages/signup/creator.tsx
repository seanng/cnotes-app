import SignupForm from 'components/templates/SignupForm'
import { withApollo } from 'lib/apollo-client'
import { GetServerSideProps } from 'next'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

function SignupCreatorPage(): JSX.Element {
  return <SignupForm />
}

export default withApollo(SignupCreatorPage)

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Automatically navigate user to dashboard if already signed in
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  }
  return { props: {} }
}
