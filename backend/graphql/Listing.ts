import add from 'date-fns/add'
import { ForbiddenError } from 'apollo-server-micro'
import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  list,
  idArg,
} from 'nexus'
import prisma from 'lib/prisma'
import {
  sendIntroductoryEmail,
  sendListingNotificationEmail,
} from 'utils/emails'
import { ACTIVE, UNVERIFIED, DECIDED } from 'shared/constants'
import { SUBMITTING } from 'shared/constants'
import { isCreator } from 'utils/auth'

export const Listing = objectType({
  name: 'Listing',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('status')
    t.nonNull.string('iconUrl')
    t.string('platform')
    t.string('deliverable')
    t.nonNull.string('description')
    t.field('specs', {
      type: 'JSON',
    })
    t.int('askingPrice')
    t.int('highestOfferValue')
    t.list.field('offers', {
      type: 'Offer',
      resolve: parent =>
        prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .offers(),
    })
    t.list.field('deals', {
      type: 'Deal',
      resolve: parent =>
        prisma.listing
          .findUnique({
            where: { id: parent.id },
          })
          .deals(),
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
    t.field('decidedAt', {
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

interface PlatformAndDeliverable {
  platform: string
  deliverable: string
}

const fromPlatformAndDeliverableInput = (
  input: string
): PlatformAndDeliverable => {
  if (input === "I'm not sure") {
    return {
      deliverable: null,
      platform: null,
    }
  }
  const [platform, deliverable] = input.toLowerCase().split(' ')
  return { platform, deliverable }
}

export const createListing = mutationField('createListing', {
  type: 'Listing',
  args: {
    input: arg({ type: 'CreateListingInput' }),
  },
  resolve: async (_, { input }, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    const now = new Date()

    const specs = { ...input.specs }

    Object.keys(specs).map(key => {
      if (specs[key] === 'Yes') {
        specs[key] = true
      } else if (specs[key] === 'No') {
        specs[key] = false
      }
    })

    const { deliverable, platform } = fromPlatformAndDeliverableInput(
      input.platformAndDeliverable
    )

    // update shipping address
    await prisma.user.update({
      where: { id: user.id },
      data: {
        address: input.address,
        updatedAt: now,
      },
    })

    const listing = await prisma.listing.create({
      data: {
        deliverable,
        platform,
        specs,
        iconUrl: input.iconUrl,
        description: input.description,
        name: input.name,
        status: UNVERIFIED,
        creator: {
          connect: { id: user.id },
        },
        highestOfferValue: 0,
        createdAt: now,
        updatedAt: now,
      },
      include: {
        creator: {
          select: {
            id: true,
            address: true,
          },
        },
      },
    })
    if (process.env.VERCEL_ENV === 'production') {
      await sendListingNotificationEmail(user, {
        listing,
        platform,
        deliverable,
        description: input.description,
        specs: input.specs,
      })
    }

    return listing
  },
})

export const createListingInput = inputObjectType({
  name: 'CreateListingInput',
  definition(t) {
    t.nonNull.string('description')
    t.nonNull.string('iconUrl')
    t.nonNull.string('name')
    t.string('platformAndDeliverable')
    t.field('specs', { type: 'JSON' })
    t.field('address', { type: 'JSON' })
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
        deals: {
          include: {
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
            bannerUrl: true,
            creatorStats: true,
            genre: true,
            slug: true,
          },
        },
        // TODO: return an offerCount instead of array of offers..
        offers: {
          select: { id: true },
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
        deals: {
          include: {
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

export const completeListing = mutationField('completeListing', {
  type: 'Listing',
  args: {
    id: idArg(),
    input: list(arg({ type: 'CreateDealsInput' })),
  },
  resolve: async (_, { id, input }, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    const now = new Date()

    const listing = await prisma.listing.update({
      where: { id },
      data: { status: DECIDED, decidedAt: now },
      include: {
        creator: {
          select: {
            email: true,
            address: true,
            alias: true,
            firstName: true,
          },
        },
      },
    })

    for (const item of input) {
      const { brand } = await prisma.deal.create({
        data: {
          ...item,
          listingId: id,
          status: SUBMITTING,
          updatedAt: now,
          createdAt: now,
        },
        select: {
          brand: {
            select: {
              firstName: true,
              alias: true,
              email: true,
            },
          },
        },
      })
      if (process.env.VERCEL_ENV === 'production') {
        // create email chain
        await sendIntroductoryEmail({
          creator: listing.creator,
          deliverable: listing.deliverable,
          platform: listing.platform,
          specs: listing.specs,
          brand,
        })
      }
    }

    return listing
  },
})

export const createDealsInput = inputObjectType({
  name: 'CreateDealsInput',
  definition(t) {
    t.nonNull.string('brandId')
    t.int('cashValue')
    t.int('productMSRP')
    t.string('message')
    t.string('productUrl')
    t.string('productName')
  },
})

export const resetListing = mutationField('resetListing', {
  type: 'Listing',
  args: {
    id: idArg(),
  },
  resolve: async (_, { id }) => {
    const now = new Date()

    const data = {
      // TODO: change # of days
      auctionEndsAt: add(now, { days: 3 }),
      updatedAt: now,
    }
    return prisma.listing.update({
      where: { id },
      data,
    })
  },
})
