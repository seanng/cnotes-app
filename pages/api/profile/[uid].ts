import { withSentry } from '@sentry/nextjs'
import { MongoClient, ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import omit from 'ramda/src/omit'
import { withApiGuard } from 'utils/backend'

async function updateUserProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // Initialize MongoDB
  const client = new MongoClient(process.env.DATABASE_URL)
  await client.connect()
  const db = client.db(
    process.env.VERCEL_ENV === 'production' ? 'production' : 'development'
  )
  const collection = db.collection('User')

  // Omit non-writable fields
  const { uid } = req.query as { uid: string }
  const data = omit(
    ['password', 'role', 'alias', 'slug', 'id', '_id'],
    req.body
  )

  // Update collection
  const response = await collection.updateOne(
    {
      _id: new ObjectId(uid),
    },
    {
      $set: data,
    }
  )

  let message = 'Successfully updated'

  if (response.modifiedCount === 0) {
    message = 'Did not update'
  } else if (response.matchedCount === 0) {
    message = 'Could not find a record with the given ID'
  }

  res.status(200).send({ message })
}

export default withSentry(withApiGuard(updateUserProfileHandler, 'PUT'))
