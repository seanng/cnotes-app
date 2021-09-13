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
// import { ACTIVE } from 'shared/constants'
import { isBrand } from 'utils/auth'

export const Bid = objectType({
  name: 'Bid',
  definition(t) {
    t.nonNull.id('id')
    // todo: replcae with getRelation('bid', 'offer')
    t.nonNull.field('offer', {
      type: 'Offer',
      resolve: parent =>
        prisma.bid
          .findUnique({
            where: { id: parent.id },
          })
          .offer(),
    })
    // todo: replcae with getRelation('bid', 'brand')
    t.nonNull.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.bid
          .findUnique({
            where: { id: parent.id },
          })
          .brand(),
    })
    t.field('history', {
      type: list('Json'),
    })
    t.boolean('isCleared')
    t.nonNull.string('message')
    t.string('productUrl')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})

export const myBids = queryField('myBids', {
  type: list('Bid'),
  resolve: async (_, __, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const data = await prisma.bid.findMany({
      where: {
        brandId: user.id,
      },
      include: {
        offer: {
          include: {
            brand: {
              select: {
                id: true,
              },
            },
            creator: {
              select: {
                alias: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    })

    return data
  },
})

export const updateBid = mutationField('updateBid', {
  type: 'Bid',
  args: {
    input: arg({ type: 'UpdateBidInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { id, ...data } = input
    const bid = await prisma.bid.update({
      data,
      where: { id },
    })
    return bid
  },
})

export const placeBid = mutationField('placeBid', {
  type: 'Bid',
  args: {
    input: arg({ type: 'PlaceBidInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { offerId, productUrl, message } = input
    const price = Number(input.price)

    let bid = await prisma.bid.findFirst({
      where: { brandId: user.id, offerId },
      include: { offer: true },
    })

    const now = new Date()

    const historyItem = { price, bidTimeStamp: now.toString() } // cant put date obj in json

    const data = {
      message,
      productUrl,
      history: bid ? [...bid.history, historyItem] : [historyItem],
      updatedAt: now,
    }

    if (!bid) {
      bid = await prisma.bid.create({
        data: {
          ...data,
          offerId,
          isCleared: false,
          brandId: user.id,
          createdAt: now,
        },
        include: {
          offer: true,
        },
      })
    } else {
      await prisma.bid.update({
        data,
        where: {
          id: bid.id,
        },
      })
    }

    await prisma.offer.update({
      where: { id: bid.offerId },
      data: {
        ...(price > bid.offer.highestBid && { highestBid: price }),
        bidCount: {
          increment: 1,
        },
        updatedAt: now,
      },
    })

    // TODO: send email to user

    return bid
  },
})

export const placeBidInput = inputObjectType({
  name: 'PlaceBidInput',
  definition(t) {
    t.nonNull.string('offerId')
    t.nonNull.string('price')
    t.nonNull.string('productUrl')
    t.string('message')
  },
})

export const updateBidInput = inputObjectType({
  name: 'UpdateBidInput',
  definition(t) {
    t.string('id')
    t.boolean('isCleared')
  },
})
