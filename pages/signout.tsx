import { useEffect } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import { getUserPayload } from 'utils/auth'
import { redirTo } from 'utils/helpers'

const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`

const SignOut: NextPage = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SIGN_OUT)

  useEffect(() => {
    signOut().then(() => {
      console.log('signed out')
      client.resetStore().then(() => {
        console.log('navigating')
        router.push('/')
      })
    })
  }, [signOut, router, client])

  return <p>Signing out...</p>
}

export default SignOut

// TODO: replace with static props?

export const getServerSideProps: GetServerSideProps = async ctx => {
  const user = getUserPayload(ctx.req?.headers?.cookie)
  if (!user) {
    redirTo('/login')
  } else {
    return { props: { user } }
  }
}
