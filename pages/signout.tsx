import { useEffect } from 'react'
import { useMutation, useApolloClient, gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

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
      client.resetStore().then(() => {
        router.push('/')
      })
    })
  }, [signOut, router, client])

  return <p>Signing out...</p>
}

export default SignOut
