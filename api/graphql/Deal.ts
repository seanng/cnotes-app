import prisma from 'lib/prisma'
import { idArg, queryField, objectType } from 'nexus'

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
    t.int('cashValue')
    t.int('productValue')
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

export const dealById = queryField('dealById', {
  type: 'Deal',
  args: {
    id: idArg(),
  },
  resolve: async (_, { id }) =>
    prisma.deal.findUnique({
      where: { id },
      include: {
        brand: true,
        listing: {
          select: {
            platform: true,
            deliverable: true,
            specs: true,
          },
        },
      },
    }),
})
