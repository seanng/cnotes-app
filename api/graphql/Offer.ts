import { ForbiddenError } from 'apollo-server-micro'
import omit from 'ramda/src/omit'
import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  list,
  stringArg,
} from 'nexus'
import prisma from '../../lib/prisma'
import { ACTIVE, DECIDED, REJECTED } from '../../shared/constants'
import { isBrand } from '../../utils/auth'

export const OfferHistory = objectType({
  name: 'OfferHistory',
  definition(t) {
    t.nonNull.string('message')
    t.int('cashValue')
    t.int('productValue')
    t.string('productName')
    t.string('productUrl')
    t.nonNull.string('createdAtString')
  },
})

export const Offer = objectType({
  name: 'Offer',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.field('listing', {
      type: 'Listing',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .listing(),
    })
    t.nonNull.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .brand(),
    })
    t.list.field('history', {
      type: 'OfferHistory',
      resolve: async parent => {
        const offer = await prisma.offer.findUnique({
          where: { id: parent.id },
        })
        return offer.history
      },
    })
    t.boolean('isCleared')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})

export const brandDashOffers = queryField('brandDashOffers', {
  type: list('Offer'),
  args: {
    type: stringArg(),
  },
  resolve: async (_, { type }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const where = { brandId: user.id, listing: {} }
    if (type === REJECTED) {
      where.listing = {
        status: DECIDED,
        deals: {
          none: {
            brandId: user.id,
          },
        },
      }
    } else if (type === ACTIVE) {
      where.listing = {
        status: ACTIVE,
      }
    }

    const data = await prisma.offer.findMany({
      where,
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
            // TODO: return an offerCount instead of array of offers..
            offers: {
              select: { id: true },
            },
          },
        },
      },
    })

    return data
  },
})

export const placeOffer = mutationField('placeOffer', {
  type: 'Offer',
  args: {
    input: arg({ type: 'PlaceOfferInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { listingId, cashValue, productValue } = input

    let offer = await prisma.offer.findFirst({
      where: { brandId: user.id, listingId },
      include: { listing: true },
    })

    const now = new Date()

    const historyItem = {
      ...omit('listingId', input),
      createdAtString: now.toString(),
    } // cant put date obj in json

    const data = {
      history: offer ? [...offer.history, historyItem] : [historyItem],
      updatedAt: now,
    }

    if (!offer) {
      offer = await prisma.offer.create({
        data: {
          ...data,
          listingId,
          isCleared: false,
          brandId: user.id,
          createdAt: now,
        },
        include: {
          listing: true,
        },
      })
    } else {
      await prisma.offer.update({
        data,
        where: {
          id: offer.id,
        },
      })
    }

    const totalValue = cashValue + productValue

    await prisma.listing.update({
      where: { id: offer.listingId },
      data: {
        ...(totalValue > offer.listing.highestOfferValue && {
          highestOfferValue: totalValue,
        }),
        updatedAt: now,
      },
    })

    // TODO: send email to user

    return offer
  },
})

export const placeOfferInput = inputObjectType({
  name: 'PlaceOfferInput',
  definition(t) {
    t.nonNull.string('listingId')
    t.int('cashValue')
    t.int('productValue')
    t.string('productName')
    t.string('productUrl')
    t.string('message')
  },
})
