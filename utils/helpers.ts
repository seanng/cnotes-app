// FRONTEND ONLY.
import { GetServerSidePropsResult, Redirect } from 'next'

export function getErrorMessage(error: Record<string, any>): string {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-restricted-syntax
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === 'BAD_USER_INPUT'
      ) {
        return graphQLError.message
      }
    }
  }
  return error.message
}

export function redirTo(location: string): GetServerSidePropsResult<Redirect> {
  return {
    redirect: {
      destination: location,
      permanent: false,
    },
  }
}
