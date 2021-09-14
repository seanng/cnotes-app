import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  list,
} from 'nexus'
import { ACTIVE, UNVERIFIED } from 'shared/constants'
import { isCreator } from 'utils/auth'

export const Offer = objectType({
  name: 'Offer',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('status')
    t.string('platform')
    t.string('deliverable')
    t.nonNull.string('description')
    t.field('deliveryStartsAt', {
      type: 'DateTime',
    })
    t.field('deliveryEndsAt', {
      type: 'DateTime',
    })
    t.boolean('canReuse')
    t.boolean('willFollowScript')
    t.int('revisionDays')
    t.int('bidCount')
    t.int('startPrice')
    t.int('finalPrice')
    t.int('numberOfRevisions')
    t.int('highestBid')
    t.list.field('bids', {
      type: 'Bid',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .bids(),
    })
    t.nonNull.field('creator', {
      type: 'User',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .creator(),
    })
    t.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.offer
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

export const createOffer = mutationField('createOffer', {
  type: 'Offer',
  args: {
    input: arg({ type: 'CreateOfferInput' }),
  },
  resolve: async (_, { input }, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    const now = new Date()

    const offer = await prisma.offer.create({
      data: {
        ...input,
        status: UNVERIFIED,
        creator: {
          connect: { id: user.id },
        },
        highestBid: 0,
        bidCount: 0,
        createdAt: now,
        updatedAt: now,
      },
    })

    // send email
    return offer
  },
})

export const createOfferInput = inputObjectType({
  name: 'CreateOfferInput',
  definition(t) {
    t.nonNull.string('description')
    t.string('platform')
    t.string('deliverable')
    t.string('deliveryStartsAt') // TODO: change to date time
    t.string('deliveryEndsAt') // TODO: change to date time
    t.boolean('canReuse')
    t.boolean('willFollowScript')
    t.int('revisionDays')
    t.int('numberOfRevisions')
  },
})

export const discoveryOffers = queryField('discoveryOffers', {
  type: list('Offer'),
  args: {
    // after: arg({ type: OfferWhereUniqueInput }),
    // before: arg({ type: OfferWhereUniqueInput }),
    // first: intArg(),
    // last: intArg(),
    // filtering...
  },
  resolve: async (_, __) => {
    return prisma.offer.findMany({
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

export const creatorDashboardOffers = queryField('creatorDashboardOffers', {
  type: 'Offer',
  resolve: async (_, __, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')

    const data = await prisma.offer.findMany({
      where: {
        creatorId: user.id,
      },
      // TODO: add filters + pagination
    })

    return data
  },
})
