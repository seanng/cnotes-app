import sgMail from 'lib/sendgrid'
import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  list,
  idArg,
} from 'nexus'
import { FROM_ADDRESS, ACTIVE, UNVERIFIED } from 'shared/constants'
import { isCreator } from 'utils/auth'

export const Listing = objectType({
  name: 'Listing',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('status')
    t.nonNull.string('iconUrl')
    t.string('platform')
    t.string('deliverable')
    t.nonNull.string('description')
    t.field('specs', {
      type: list('JSON'),
    })
    t.int('offerCount')
    t.int('startPrice')
    t.int('highestOffer')
    t.list.field('offers', {
      type: 'Offer',
      resolve: parent =>
        prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .offers(),
    })
    t.nonNull.field('creator', {
      type: 'User',
      resolve: parent =>
        prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .creator(),
    })
    t.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .brand(),
    })
    t.field('auctionEndsAt', {
      type: 'DateTime',
    })
    t.field('selectedAt', {
      type: 'DateTime',
    })
    t.field('transactedAt', {
      type: 'DateTime',
    })
    t.field('paidAt', {
      type: 'DateTime',
    })
    t.field('completedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const createListing = mutationField('createListing', {
  type: 'Listing',
  args: {
    input: arg({ type: 'CreateListingInput' }),
  },
  resolve: async (_, { input }, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    const now = new Date()

    const listing = await prisma.listing.create({
      data: {
        ...input,
        // iconUrl: `${S3_LISTING_THUMBNAILS_FOLDER}/${Math.ceil(
        //   Math.random() * 10
        // )}.png`,
        status: UNVERIFIED,
        creator: {
          connect: { id: user.id },
        },
        highestOffer: 0,
        offerCount: 0,
        createdAt: now,
        updatedAt: now,
      },
    })
    if (process.env.NODE_ENV === 'production') {
      await sgMail.send({
        from: FROM_ADDRESS,
        to: ['shonum@gmail.com', 'michael@cnotes.co'],
        subject: `cnotes: ${user.alias} has submitted an listing`,
        html: `
          <h1>${user.alias} has submitted an listing:</h1>
          <p>User ID: ${user.id} </p>
          <p>Listing ID: ${listing.id} </p>
          <p>Platform: ${input.platform} </p>
          <p>Deliverable: ${input.deliverable} </p>
          <p>Description: ${input.description} </p>
          <p>${input.specs.map(spec => `${spec.key}: ${spec.value}`)}</p>
          <hr />
        `,
      })
    }

    // send email
    return listing
  },
})

export const createListingInput = inputObjectType({
  name: 'CreateListingInput',
  definition(t) {
    t.nonNull.string('description')
    t.nonNull.string('iconUrl')
    t.string('platform')
    t.string('deliverable')
    t.field('specs', { type: list('JSON') })
  },
})

export const listingWhereUniqueInput = inputObjectType({
  name: 'ListingWhereUniqueInput',
  definition(t) {
    t.id('id')
  },
})

export const listingById = queryField('listingById', {
  type: 'Listing',
  args: {
    id: idArg(),
  },
  resolve: async (_, { id }) =>
    prisma.listing.findUnique({
      where: { id },
      include: {
        creator: true,
        offers: {
          select: {
            history: true,
            brand: {
              select: {
                id: true,
                slug: true,
                alias: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    }),
})

export const discoveryListings = queryField('discoveryListings', {
  type: list('Listing'),
  args: {
    // after: arg({ type: ListingWhereUniqueInput }),
    // before: arg({ type: ListingWhereUniqueInput }),
    // first: intArg(),
    // last: intArg(),
    // filtering...
  },
  resolve: async (_, __) => {
    return prisma.listing.findMany({
      where: {
        status: ACTIVE,
        auctionEndsAt: {
          gt: new Date(),
        },
      },
      include: {
        creator: {
          select: {
            avatarUrl: true,
            alias: true,
            slug: true,
          },
        },
      },
    })
  },
})

export const creatorDashboardListings = queryField('creatorDashboardListings', {
  type: list('Listing'),
  resolve: async (_, __, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    return prisma.listing.findMany({
      where: {
        creatorId: user.id,
      },
      include: {
        offers: {
          select: {
            brand: {
              select: {
                avatarUrl: true,
                alias: true,
              },
            },
          },
        },
      },
    })
  },
})
