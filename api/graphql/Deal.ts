import prisma from 'lib/prisma'
import { objectType } from 'nexus'

export const Deal = objectType({
  name: 'Deal',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('status')
    t.nonNull.field('listing', {
      type: 'Listing',
      resolve: parent =>
        prisma.deal
          .findUnique({
            where: { id: parent.id },
          })
          .listing(),
    })
    t.nonNull.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.deal
          .findUnique({
            where: { id: parent.id },
          })
          .brand(),
    })
    t.nonNull.string('message')
    t.int('price')
    t.string('productName')
    t.string('productUrl')
    t.field('submittedAt', {
      type: 'DateTime',
    })
    t.field('paidAt', {
      type: 'DateTime',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})
