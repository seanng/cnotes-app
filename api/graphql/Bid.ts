import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import { arg, inputObjectType, mutationField, objectType } from 'nexus'
import { isBrand } from 'utils/auth'

export const Bid = objectType({
  name: 'Bid',
  definition(t) {
    t.nonNull.id('_id')
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
    t.nonNull.int('price')
    t.nonNull.string('message')
    t.nonNull.string('productUrl')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})

export const CreateBid = mutationField('createBid', {
  type: 'Bid',
  args: {
    input: arg({ type: 'CreateBidInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')

    const bid = await prisma.bid.create({
      data: {
        ...input,
        brand: {
          connect: { id: user.id },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    console.log('bid: ', bid)

    // send email
    return {
      _id: bid.id,
      ...bid,
    }
  },
})

export const CreateBidInput = inputObjectType({
  name: 'CreateBidInput',
  definition(t) {
    t.nonNull.int('price')
    t.nonNull.string('productUrl')
    t.string('message')
  },
})
