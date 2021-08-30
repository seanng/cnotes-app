import prisma from 'lib/prisma'
import { objectType } from 'nexus'

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
