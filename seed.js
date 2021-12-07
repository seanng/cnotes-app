// PRISMA DOES NOT SUPPORT SEEDING MONGODB. USE THIS FILE.
const faker = require('faker')
const slugify = require('slugify')
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcryptjs')

// CONFIG
const DB_URL = process.env.DATABASE_URL
const DB_NAME = 'development'
const collections = ['User', 'Listing', 'Offer', 'Deal']

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
        isVerified: false,
        url: 'https://www.youtube.com/watch?v=aJOTlE1K90k',
        thumbnailUrl: 'https://i.ytimg.com/vi/__9UQN2DLV8/sddefault.jpg',
        title: 'Maroon 5 - Girls Like You ft. Cardi B (Official Music Video)',
        deliverable: 'Pre-roll',
        commentCount: 659951,
        dislikeCount: 792978,
        likeCount: 19395092,
        mediaId: 'aJOTlE1K90k',
        platform: 'youtube',
        publishedAt: '2018-05-31T04:00:00Z',
        viewCount: 3126438229,
      },
      {
        companyName: 'RayZor',
        companyUrl: 'https://www.razer.com',
        isVerified: true,
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnailUrl: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/sddefault.jpg',
        likeCount: 11840656,
        dislikeCount: 320313,
        deliverable: 'Dedicated',
        title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
        commentCount: 1985434,
        mediaId: 'dQw4w9WgXcQ',
        platform: 'youtube',
        publishedAt: '2009-10-25T06:57:33Z',
      },
      {
        url: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4',
        thumbnailUrl: 'https://i.ytimg.com/vi/ZZ5LpwO-An4/hqdefault.jpg',
        title: 'HEYYEYAAEYAAAEYAEYAA',
        viewCount: 188995042,
        likeCount: 3419717,
        dislikeCount: 92202,
        commentCount: 335133,
        publishedAt: '2010-11-07T21:01:39Z',
        mediaId: 'ZZ5LpwO-An4',
        platform: 'youtube',
      },
    ]

    const data = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: bcrypt.hashSync('asdfasdf', bcrypt.genSaltSync()),
      status: 'verified',
      role: isBrand ? 'brand' : 'creator',
      email: `a${i}@a.com`,
      // add i because alias should be unique.
      alias,
      slug: slugify(alias.toLowerCase()),
      creatorStats: {
        avgImpressions: '32,710',
        avgEngagement: '12.36%',
        followerCount: '150k',
        totalCollabsCount: '25',
        genderBreakdown: {
          female: 38,
          male: 62,
        },
        locationBreakdown: [
          {
            country: 'USA',
            value: 70,
          },
          {
            country: 'UK',
            value: 20,
          },
          {
            country: 'Japan',
            value: 10,
          },
        ],
      },
      ...(!isBrand && { portfolio }),
      ...(!isBrand && { genre: 'Mechanical Keyboard Reviewer' }),
      statsLastVerifiedAt: now,
      createdAt: now,
      updatedAt: now,
    }
    users.push(data)
  }

  await collection.insertMany(users)
}

async function seedListing(db) {
  const collection = db.collection('Listing')
  const creators = await db
    .collection('User')
    .find({ role: 'creator' })
    .toArray()
  const listings = []
  const now = new Date()

  creators.forEach(creator => {
    const listingCount = faker.datatype.number({ min: 4, max: 8 })
    for (let i = 0; i < listingCount; i++) {
      const data = {
        highestOfferValue: 0,
        askingPrice: 500,
        name: faker.system.commonFileName(),
        platform: faker.random.arrayElement(['youtube', 'tiktok']),
        deliverable: faker.random.arrayElement(['integration', 'dedicated']),
        status: i % 2 === 0 ? 'active' : 'decided',
        description: faker.lorem.paragraph(5),
        creatorId: creator._id,
        auctionEndsAt:
          i % 2 === 0
            ? faker.date.soon(faker.datatype.number({ min: 1, max: 5 }))
            : faker.date.recent(faker.datatype.number(1)),
        iconUrl: `https://d29zuagwjyq1tv.cloudfront.net/assets/mnemonics/${Math.ceil(
          Math.random() * 10
        )}.png`,
        specs: {
          numberOfRevisions: faker.datatype.number({ min: 0, max: 3 }),
          willFollowScript: i % 2 === 0,
          previewTime: '7 days',
          canReuse: i % 2 === 0,
        },
        createdAt: now,
        updatedAt: now,
        decidedAt: i % 2 === 0 ? null : now,
      }
      listings.push(data)
    }
  })
  await collection.insertMany(listings)
}

async function seedOffer(db) {
  const brands = await db.collection('User').find({ role: 'brand' }).toArray()
  const listings = await db.collection('Listing').find().toArray()

  const now = new Date()
  const offers = []

  for (let listing of listings) {
    let highestOfferValue = 0
    brands.forEach(brand => {
      const hasOffer = faker.datatype.boolean()
      if (!hasOffer) {
        // makes it so half the time the brand doesnt have a Offer on the listing
        return
      }

      const cashValue = faker.datatype.number({ min: 100, max: 500 })
      const productMSRP = faker.datatype.number({ min: 100, max: 500 })
      const totalValue = cashValue + productMSRP
      if (totalValue > highestOfferValue) {
        highestOfferValue = totalValue
      }

      const data = {
        listingId: listing._id,
        brandId: brand._id,
        isCleared: false,
        history: [
          {
            cashValue,
            createdAtString: now.toString(),
            productUrl: faker.internet.url(),
            productMSRP,
            productName: faker.commerce.productName(),
            message: faker.lorem.sentences(2),
          },
        ],
        createdAt: now,
        updatedAt: now,
      }

      offers.push(data)
    })
    await db
      .collection('Listing')
      .updateOne({ _id: listing._id }, { $set: { highestOfferValue } })
  }

  await db.collection('Offer').insertMany(offers)
}

async function seedDeal(db) {
  const deals = []
  const listings = await db
    .collection('Listing')
    .find({ status: 'decided' })
    .toArray()
  const brands = await db.collection('User').find({ role: 'brand' }).toArray()
  const now = new Date()

  for (let listing of listings) {
    for (let i = 0; i < brands.length; i += 1) {
      if (Math.round(Math.random()) === 0) {
        continue
      }
      const brand = brands[i]
      const data = {
        status: 'submitting',
        listingId: listing._id,
        brandId: brand._id,
        message: faker.lorem.sentences(2),
        productMSRP: 400,
        productName: faker.commerce.productName(),
        cashValue: 400,
        productUrl: 'https://sony.com/headphones',
        createdAt: now,
        updatedAt: now,
      }
      deals.push(data)
    }
  }
  // console.log('deals: ', deals)
  await db.collection('Deal').insertMany(deals)
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
    await seedListing(db)
    await seedOffer(db)
    await seedDeal(db)

    console.log('Database seeded! :)')
    client.close()
  } catch (err) {
    console.log('err: ', err)
    console.log(err.stack)
  }
}

seedDB()
