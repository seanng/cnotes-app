import { ForbiddenError } from 'apollo-server-micro'
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
import prisma from 'lib/prisma'
import { PAYING, CANCELLED, COMPLETED } from 'shared/constants'
import { isBrand } from 'utils/auth'
import { sendUrlSubmittedEmail } from 'utils/emails'

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
    t.int('productMSRP')
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
  resolve: async (_, { id, payload }, { user }) => {
    const now = new Date()

    const deal = await prisma.deal.update({
      where: { id },
      data: {
        ...payload,
        ...(payload.status === PAYING && {
          submittedAt: now,
        }),
        ...(payload.status === COMPLETED && {
          paidAt: now,
        }),
        updatedAt: now,
      },
      include: {
        brand: {
          select: {
            email: true,
            firstName: true,
          },
        },
      },
    })

    if (process.env.VERCEL_ENV === 'production' && user) {
      if (payload.status === PAYING && payload.submittedUrl) {
        // notify brand that creator just submitted url
        await sendUrlSubmittedEmail({
          brand: deal.brand,
          creator: user,
          submittedUrl: payload.submittedUrl,
        })
      }

      if (payload.status === COMPLETED) {
        // email
      }
    }

    return deal
  },
})

export const updateDealInput = inputObjectType({
  name: 'UpdateDealInput',
  definition(t) {
    t.string('submittedUrl')
    t.string('status')
  },
})
