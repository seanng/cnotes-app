import { withSentry } from '@sentry/nextjs'
import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { withApiGuard } from 'utils/backend'
import qs from 'qs'

async function getUsersHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const params = qs.parse(req.query)
  const client = new MongoClient(process.env.DATABASE_URL)
  await client.connect()
  const db = client.db(
    process.env.VERCEL_ENV === 'production' ? 'production' : 'development'
  )
  const getUsers = () =>
    new Promise((resolve, reject) => {
      db.collection('User')
        .find(params, {
          projection: {
            _id: 1,
            alias: 1,
            portfolio: 1,
            // 'portfolio.url': 1,
            // 'portfolio.companyName': 1,
            // 'portfolio.companyUrl': 1,
            // 'portfolio.deliverable': 1,
          },
        })
        .toArray(function (err, docs) {
          if (err) {
            return reject(err)
          }
          return resolve(docs)
        })
    })
  try {
    const data = await getUsers()
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}

export default withSentry(withApiGuard(getUsersHandler, ['GET']))
