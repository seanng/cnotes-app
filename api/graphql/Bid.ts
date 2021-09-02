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
    t.nonNull.string('message')
    t.string('productUrl')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})

// where active = active & now < auctionEndsAt
// export const getActiveBids = queryField('getActiveBids', {
//   type: 'Bid',
//   resolve: async (_, __, { user }) => {
//     if (!isBrand(user)) throw new ForbiddenError('Not a brand')

//     const data = await prisma.bid.findMany({
//       where: {
//         brandId: user.id,
//         offer: {
//           status: ACTIVE,
//           auctionEndsAt: {
//             gt: new Date(),
//           },
//         },
//       },
//       include: {
//         offer: true,
//       },
//     })

//     return data
//   },
// })

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
            bids: {
              select: {
                // https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing/#count-relations
                // ATM, mongodb count is not supported :(
                history: true,
              },
            },
            creator: {
              // todo: change to handle
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    return data
  },
})

export const placeBid = mutationField('placeBid', {
  type: 'Bid',
  args: {
    input: arg({ type: 'PlaceBidInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { price, offerId, productUrl, message } = input

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

    if (price > bid.offer.highestBid) {
      await prisma.offer.update({
        where: { id: bid.offerId },
        data: {
          highestBid: price,
          updatedAt: now,
        },
      })
    }

    // TODO: send email to user

    return bid
  },
})

export const placeBidInput = inputObjectType({
  name: 'PlaceBidInput',
  definition(t) {
    t.nonNull.string('offerId')
    t.nonNull.int('price')
    t.nonNull.string('productUrl')
    t.string('message')
  },
})
