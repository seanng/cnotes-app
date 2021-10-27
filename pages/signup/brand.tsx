import SignupForm from 'components/templates/SignupForm'
import { GetServerSideProps } from 'next'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

export default function SignupBrandPage(): JSX.Element {
  return <SignupForm isBrand />
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  // Automatically navigate user to dashboard if already signed in
  if (getUserPayload(ctx.req.headers?.cookie)) {
    return redirTo('/dashboard')
  }
  return { props: {} }
}
