import sgMail from 'lib/sendgrid'
import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import {
  arg,
  inputObjectType,
  mutationField,
  objectType,
  queryField,
  list,
  idArg,
} from 'nexus'
import { FROM_ADDRESS, ACTIVE, UNVERIFIED } from 'shared/constants'
import { isCreator } from 'utils/auth'

export const Offer = objectType({
  name: 'Offer',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('status')
    t.nonNull.string('iconUrl')
    t.string('platform')
    t.string('deliverable')
    t.nonNull.string('description')
    t.field('deliveryStartsAt', {
      type: 'DateTime',
    })
    t.field('deliveryEndsAt', {
      type: 'DateTime',
    })
    t.field('specs', {
      type: list('JSON'),
    })
    t.int('bidCount')
    t.int('startPrice')
    t.int('finalPrice')
    t.int('highestBid')
    t.list.field('bids', {
      type: 'Bid',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .bids(),
    })
    t.nonNull.field('creator', {
      type: 'User',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .creator(),
    })
    t.field('brand', {
      type: 'User',
      resolve: parent =>
        prisma.offer
          .findUnique({
            where: { id: parent.id },
          })
          .brand(),
    })
    t.field('auctionEndsAt', {
      type: 'DateTime',
    })
    t.field('selectedAt', {
      type: 'DateTime',
    })
    t.field('transactedAt', {
      type: 'DateTime',
    })
    t.field('paidAt', {
      type: 'DateTime',
    })
    t.field('completedAt', {
      type: 'DateTime',
    })
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const createOffer = mutationField('createOffer', {
  type: 'Offer',
  args: {
    input: arg({ type: 'CreateOfferInput' }),
  },
  resolve: async (_, { input }, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    const now = new Date()

    const offer = await prisma.offer.create({
      data: {
        ...input,
        // iconUrl: `${S3_OFFER_THUMBNAILS_FOLDER}/${Math.ceil(
        //   Math.random() * 10
        // )}.png`,
        status: UNVERIFIED,
        creator: {
          connect: { id: user.id },
        },
        highestBid: 0,
        bidCount: 0,
        createdAt: now,
        updatedAt: now,
      },
    })
    if (process.env.NODE_ENV === 'production') {
      await sgMail.send({
        from: FROM_ADDRESS,
        to: ['shonum@gmail.com', 'michael@cnotes.co'],
        subject: `cnotes: ${user.alias} has submitted an offer`,
        html: `
          <h1>${user.alias} has submitted an offer:</h1>
          <p>User ID: ${user.id} </p>
          <p>Offer ID: ${offer.id} </p>
          <p>Platform: ${input.platform} </p>
          <p>Deliverable: ${input.deliverable} </p>
          <p>Description: ${input.description} </p>
          <p>${input.specs.map(spec => `${spec.key}: ${spec.value}`)}</p>
          <hr />
        `,
      })
    }

    // send email
    return offer
  },
})

export const createOfferInput = inputObjectType({
  name: 'CreateOfferInput',
  definition(t) {
    t.nonNull.string('description')
    t.nonNull.string('iconUrl')
    t.string('platform')
    t.string('deliverable')
    t.field('specs', { type: list('JSON') })
  },
})

export const offerWhereUniqueInput = inputObjectType({
  name: 'OfferWhereUniqueInput',
  definition(t) {
    t.id('id')
  },
})

export const offerById = queryField('offerById', {
  type: 'Offer',
  args: {
    id: idArg(),
  },
  resolve: async (_, { id }) =>
    prisma.offer.findUnique({ where: { id }, include: { creator: true } }),
})

export const discoveryOffers = queryField('discoveryOffers', {
  type: list('Offer'),
  args: {
    // after: arg({ type: OfferWhereUniqueInput }),
    // before: arg({ type: OfferWhereUniqueInput }),
    // first: intArg(),
    // last: intArg(),
    // filtering...
  },
  resolve: async (_, __) => {
    return prisma.offer.findMany({
      where: {
        status: ACTIVE,
        auctionEndsAt: {
          gt: new Date(),
        },
      },
      include: {
        creator: {
          select: {
            avatarUrl: true,
            alias: true,
            slug: true,
          },
        },
      },
    })
  },
})

export const creatorDashboardOffers = queryField('creatorDashboardOffers', {
  type: list('Offer'),
  resolve: async (_, __, { user }) => {
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')
    return prisma.offer.findMany({
      where: {
        creatorId: user.id,
      },
    })
  },
})
