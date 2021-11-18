import { MongoClient } from 'mongodb'
import omit from 'ramda/src/omit'

export default async function updateUserProfileHandler(req, res) {
  // Guard the route if incorrect method or password
  if (req.method !== 'PUT') return
  if (!req.headers['X-API-KEY']) {
    res.status(403).send({
      message: 'No API Key found in headers',
    })
    return
  }
  if (req.headers['X-API-KEY'] !== 'cnotes123') {
    res.status(403).send({
      message: 'Incorrect API Key',
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
  await collection.updateOne(
    {
      _id: uid,
    },
    {
      $set: data,
    }
  )

  res.status(200).send({
    message: 'Successfully updated',
  })
}
