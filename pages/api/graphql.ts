import { ApolloServer } from 'apollo-server-micro'
import { NextApiHandler } from 'next'
import cors from 'micro-cors'
import schema from 'backend/schema'
import { getUserPayload } from 'utils/auth'

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({
  schema,
  context(ctx): Record<string, any> {
    const user = getUserPayload(ctx.req.headers.cookie ?? '')
    return { ...ctx, user }
  },
})

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler(): Promise<NextApiHandler> {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: '/api/graphql',
    })
  }

  return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === 'OPTIONS') {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
