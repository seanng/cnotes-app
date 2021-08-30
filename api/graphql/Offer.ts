import { ForbiddenError } from 'apollo-server-micro'
import prisma from 'lib/prisma'
import { arg, inputObjectType, mutationField, objectType } from 'nexus'
import { PENDING } from 'shared/constants'
import { isCreator } from 'utils/auth'

export const Offer = objectType({
  name: 'Offer',
  definition(t) {
    t.nonNull.id('_id')
    t.nonNull.string('status')
    t.string('platform')
    t.string('deliverable')
    t.nonNull.string('description')
    t.string('deliveryStartsAt') // TODO: change to date time
    t.string('deliveryEndsAt') // TODO: change to date time
    t.boolean('canReuse')
    t.boolean('willFollowScript')
    t.int('revisionDays')
    t.int('numberOfRevisions')
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

export const CreateOffer = mutationField('createOffer', {
  type: 'Offer',
  args: {
    input: arg({ type: 'CreateOfferInput' }),
  },
  resolve: async (ctx, { input }, { user }) => {
    console.log('input: ', input)
    console.log('user: ', user)
    if (!isCreator(user)) throw new ForbiddenError('Not a creator')

    const offer = await prisma.offer.create({
      data: {
        ...input,
        status: PENDING,
        creator: {
          connect: { id: user.id },
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    console.log('offer: ', offer)

    // send email
    return {
      _id: offer.id,
      ...offer,
    }
  },
})

export const CreateOfferInput = inputObjectType({
  name: 'CreateOfferInput',
  definition(t) {
    t.nonNull.string('description')
    t.string('platform')
    t.string('deliverable')
    t.string('deliveryStartsAt') // TODO: change to date time
    t.string('deliveryEndsAt') // TODO: change to date time
    t.boolean('canReuse')
    t.boolean('willFollowScript')
    t.int('revisionDays')
    t.int('numberOfRevisions')
  },
})
