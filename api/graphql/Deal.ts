import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import {
  inputObjectType,
  mutationField,
  arg,
  idArg,
  queryField,
  objectType,
  list,
  stringArg,
} from 'nexus'
import { PAYING, CANCELLED } from 'shared/constants'
import { isBrand } from 'utils/auth'

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
    t.string('submittedUrl')
    t.field('submittedAt', {
      type: 'DateTime',
    })
    t.field('paidAt', {
      type: 'DateTime',
    })
    t.field('cancelledAt', {
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

export const brandDashDeals = queryField('brandDashDeals', {
  type: list('Deal'),
  args: {
    type: stringArg(),
  },
  resolve: async (_, { type }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const data = await prisma.deal.findMany({
      where: {
        brandId: user.id,
        ...(type === CANCELLED
          ? {
              status: CANCELLED,
            }
          : {
              NOT: {
                status: CANCELLED,
              },
            }),
      },
      include: {
        listing: {
          include: {
            creator: {
              select: {
                alias: true,
                avatarUrl: true,
                slug: true,
              },
            },
          },
        },
      },
    })
    return data
  },
})

export const updateDeal = mutationField('updateDeal', {
  type: 'Deal',
  args: {
    id: idArg(),
    payload: arg({ type: 'UpdateDealInput' }),
  },
  resolve: async (_, { id, payload }) => {
    const now = new Date()

    const data = {
      ...payload,
      ...(payload.submittedUrl && {
        status: PAYING,
        submittedAt: now,
      }),
      updatedAt: now,
    }
    return prisma.deal.update({
      where: { id },
      data,
    })
  },
})

export const updateDealInput = inputObjectType({
  name: 'UpdateDealInput',
  definition(t) {
    t.string('submittedUrl')
  },
})
