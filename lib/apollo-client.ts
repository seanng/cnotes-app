// Must-read: https://www.apollographql.com/docs/react/performance/server-side-rendering/

import { ApolloClient, InMemoryCache } from '@apollo/client'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `${baseUrl}/api`,
  ssrMode: typeof window === 'undefined',
})

export default client
