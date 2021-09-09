import * as R from 'ramda'
import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'
import prisma from 'lib/prisma'
import { arg, inputObjectType, list, mutationField, objectType } from 'nexus'
import slugify from 'slugify'
import { ALIAS_TAKEN, userPublicFields } from 'shared/constants'
import { encryptToken, serializeCookie } from 'utils/auth'
import { User as UserType } from 'shared/types'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('role')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.string('websiteUrl')
    t.string('avatarUrl')
    t.field('portfolio', {
      type: list('Json'),
    })
    t.nonNull.string('alias')
    t.nonNull.string('slug')
    t.nonNull.string('status')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    input: arg({ type: 'UserInput' }),
  },
  resolve: async (_, { input }, { user, res }) => {
    if (!user) throw new ForbiddenError('Not authorized')
    const now = new Date()

    const slug = slugify(input.alias)

    const aliasUser = await prisma.user.findUnique({
      where: { slug },
    })
    if (aliasUser && aliasUser.id !== user.id) {
      throw new AuthenticationError(ALIAS_TAKEN)
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...input,
        slug,
        updatedAt: now,
      },
    })
    const userObj = R.pick(userPublicFields, updated) as UserType
    const token = encryptToken(userObj)

    res.setHeader('Set-Cookie', serializeCookie(token))
    return userObj
  },
})

export const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('alias')
    t.string('websiteUrl')
    t.string('avatarUrl')
    t.field('portfolio', {
      type: list('Json'),
    })
    t.string('description')
  },
})
