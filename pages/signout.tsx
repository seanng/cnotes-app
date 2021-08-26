import { useEffect } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

const SignOutMutation = gql`
  mutation SignOutMutation {
    signOut
  }
`

const SignOut: NextPage = () => {
  const client = useApolloClient()
  const router = useRouter()
  const [signOut] = useMutation(SignOutMutation)

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
