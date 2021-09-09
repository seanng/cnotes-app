// PRISMA DOES NOT SUPPORT SEEDING MONGODB. USE THIS FILE.
const faker = require('faker')
const slugify = require('slugify')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')

require('dotenv').config()

// CONFIG
const DB_URL = process.env.DATABASE_URL
const DB_NAME = 'development'
const collections = ['User', 'Offer', 'Bid']

async function dropCollections(db) {
  // console.log('Dropping collections.')
  for (const name of collections) {
    const collection = db.collection(name)
    await collection.drop().catch(error => {
      if (error.codeName === 'NamespaceNotFound') {
        console.log('Collection not found: ', name)
      }
    })
  }
}

async function seedUser(db) {
  const collection = db.collection('User')
  const users = []
  const now = new Date()
  for (let i = 0; i < 10; i++) {
    const isBrand = i % 2
    const alias = isBrand
      ? `${faker.company.companyName()}${i}`
      : `${faker.internet.userName()}${i}`

    const portfolio = [
      {
        companyName: 'Razer Corp',
        companyUrl: 'https://www.razer.com',
        url: 'https://youtube.com/sample',
        thumbnailUrl: 'https://i.ytimg.com/vi/__9UQN2DLV8/sddefault.jpg',
        deliverable: 'Integration',
        platform: 'YouTube',
        description: 'blablabla',
        executedAt: new Date(),
      },
      {
        companyName: 'RayZor',
        companyUrl: 'https://www.razer.com',
        url: 'https://youtube.com/sample2',
        thumbnailUrl: 'https://i.ytimg.com/vi/__9UQN2DLV8/sddefault.jpg',
        deliverable: 'Dedicated',
        platform: 'YouTube',
        description: 'blablabla',
        executedAt: new Date(),
      },
      {
        url: 'https://youtube.com/sample',
        thumbnailUrl: 'https://i.ytimg.com/vi/__9UQN2DLV8/sddefault.jpg',
        description: 'blablabla',
        platform: 'YouTube',
      },
      {
        url: 'https://youtube.com/sample2',
        thumbnailUrl: 'https://i.ytimg.com/vi/__9UQN2DLV8/sddefault.jpg',
        description: 'blablabla',
        platform: 'YouTube',
      },
    ]

    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: bcrypt.hashSync('asdfasdf', bcrypt.genSaltSync()),
      status: 'VERIFIED',
      role: isBrand ? 'BRAND' : 'CREATOR',
      email: `a${i}@a.com`,
      // add i because alias should be unique.
      alias,
      slug: slugify(alias),
      ...(!isBrand && { portfolio }),
      createdAt: now,
      updatedAt: now,
    }
    users.push(data)
  }

  await collection.insertMany(users)
}

async function seedOffer(db) {
  const collection = db.collection('Offer')
  const creators = await db
    .collection('User')
    .find({ role: 'CREATOR' })
    .toArray()
  const offers = []
  const now = new Date()

  const auctionEndsAt = faker.date.soon(
    faker.datatype.number({ min: 1, max: 5 })
  )
  const deliveryStartsAt = faker.date.soon(10, auctionEndsAt)
  const deliveryEndsAt = faker.date.soon(14, deliveryStartsAt)

  creators.forEach(creator => {
    const offerCount = faker.datatype.number({ min: 1, max: 4 })
    for (let i = 0; i < offerCount; i++) {
      const data = {
        highestBid: 0,
        platform: faker.random.arrayElement(['YouTube', 'TikTok']),
        deliverable: faker.random.arrayElement(['Integration', 'Deliverable']),
        description: faker.lorem.paragraph(5),
        creatorId: creator._id,
        auctionEndsAt,
        numberOfRevisions: faker.datatype.number({ min: 0, max: 3 }),
        revisionDays: 7,
        willFollowScript: i % 2 === 0,
        deliveryStartsAt,
        deliveryEndsAt,
        createdAt: now,
        updatedAt: now,
      }
      offers.push(data)
    }
  })
  await collection.insertMany(offers)
}

async function seedBid(db) {
  const brands = await db.collection('User').find({ role: 'BRAND' }).toArray()

  const offers = await db.collection('Offer').find().toArray()

  const now = new Date()
  const bids = []

  for (let offer of offers) {
    let highestBid = 0
    let bidCount = 0
    brands.forEach(brand => {
      const hasBid = faker.datatype.boolean()
      if (!hasBid) {
        // makes it so half the time the brand doesnt have a bid on the offer
        return
      }

      const price = faker.datatype.number({ min: 100, max: 500 })
      if (price > highestBid) {
        highestBid = price
      }

      const data = {
        offerId: offer._id,
        brandId: brand._id,
        productUrl: faker.internet.url(),
        message: faker.lorem.sentences(2),
        history: [{ price, bidAt: now }],
        createdAt: now,
        updatedAt: now,
      }

      bids.push(data)
      bidCount += 1
    })
    await db
      .collection('Offer')
      .updateOne({ _id: offer._id }, { $set: { highestBid, bidCount } })
  }

  await db.collection('Bid').insertMany(bids)
}

async function seedDB() {
  // Connection URL
  const client = new MongoClient(DB_URL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })

  try {
    await client.connect()
    console.log('Connected correctly to server')
    const db = client.db(DB_NAME)

    await dropCollections(db)
    await seedUser(db)
    await seedOffer(db)
    await seedBid(db)

    console.log('Database seeded! :)')
    client.close()
  } catch (err) {
    console.log('err: ', err)
    console.log(err.stack)
  }
}

seedDB()
