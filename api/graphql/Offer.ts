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
import { isBrand } from 'utils/auth'

export const OfferHistory = objectType({
  name: 'OfferHistory',
  definition(t) {
    t.nonNull.int('price')
    t.nonNull.string('date')
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
    t.nonNull.string('message')
    t.string('productUrl')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
  },
})

export const myOffers = queryField('myOffers', {
  type: list('Offer'),
  resolve: async (_, __, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const data = await prisma.offer.findMany({
      where: {
        brandId: user.id,
      },
      include: {
        listing: {
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

export const updateOffer = mutationField('updateOffer', {
  type: list('Offer'),
  args: {
    input: arg({ type: 'UpdateOfferInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { id, ...data } = input
    const offer = await prisma.offer.update({
      data,
      where: { id },
    })
    return offer
  },
})

export const placeOffer = mutationField('placeOffer', {
  type: 'Offer',
  args: {
    input: arg({ type: 'PlaceOfferInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    if (!isBrand(user)) throw new ForbiddenError('Not a brand')
    const { listingId, productUrl, message } = input
    const price = Number(input.price)

    let offer = await prisma.offer.findFirst({
      where: { brandId: user.id, listingId },
      include: { listing: true },
    })

    const now = new Date()

    const historyItem = { price, date: now.toString() } // cant put date obj in json

    const data = {
      message,
      productUrl,
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

    await prisma.listing.update({
      where: { id: offer.listingId },
      data: {
        ...(price > offer.listing.highestOffer && { highestOffer: price }),
        offerCount: {
          increment: 1,
        },
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
    t.nonNull.string('price')
    t.nonNull.string('productUrl')
    t.string('message')
  },
})

export const updateOfferInput = inputObjectType({
  name: 'UpdateOfferInput',
  definition(t) {
    t.string('id')
    t.boolean('isCleared')
  },
})
