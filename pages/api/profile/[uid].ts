import { MongoClient, ObjectId } from 'mongodb'
import omit from 'ramda/src/omit'

export default async function updateUserProfileHandler(req, res) {
  // Guard the route if incorrect method or password
  if (!req.headers['x-api-key']) {
    res.status(403).send({
      message: 'No API Key found in headers',
    })
    return
  }
  if (req.headers['x-api-key'] !== 'cnotes123') {
    res.status(403).send({
      message: 'Incorrect API Key',
    })
    return
  }
  if (req.method !== 'PUT') {
    res.status(405).send({
      message: 'Method not allowed',
    })
    return
  }

  // Initialize MongoDB
  const client = new MongoClient(process.env.DATABASE_URL)
  await client.connect()
  const db = client.db(
    process.env.VERCEL_ENV === 'production' ? 'production' : 'development'
  )
  const collection = db.collection('User')

  // Omit non-writable fields
  const { uid } = req.query
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
