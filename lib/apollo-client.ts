// Must-read: https://www.apollographql.com/docs/react/performance/server-side-rendering/

import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: `/api`,
  ssrMode: typeof window === 'undefined',
})

export default client
