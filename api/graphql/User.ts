import * as R from 'ramda'
import { AuthenticationError, ForbiddenError } from 'apollo-server-errors'
import prisma from 'lib/prisma'
import { User as UserType } from '@prisma/client'
import {
  arg,
  stringArg,
  inputObjectType,
  queryField,
  list,
  mutationField,
  objectType,
} from 'nexus'
import slugify from 'slugify'
import { ALIAS_TAKEN, userPublicFields } from 'shared/constants'
import {
  encryptToken,
  serializeCookie,
  isCreator,
  createPassword,
} from 'utils/auth'
import { populatePortfolioData } from 'utils/backend'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('role')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.string('about')
    t.string('genre')
    t.string('tiktokUrl')
    t.string('youtubeUrl')
    t.string('instagramUrl')
    t.string('facebookUrl')
    t.string('websiteUrl')
    t.string('bannerUrl')
    t.string('avatarUrl')
    t.field('portfolio', {
      type: list('JSON'),
    })
    t.field('creatorStats', {
      type: 'JSON',
    })
    t.nonNull.string('alias')
    t.nonNull.string('slug')
    t.nonNull.string('status')
    t.field('statsLastVerifiedAt', {
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

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    input: arg({ type: 'UserInput' }),
  },
  resolve: async (_, { input }, { user, res }) => {
    if (!user) throw new ForbiddenError('Not authorized')
    const now = new Date()
    const data = { ...input }

    data.slug = slugify(input.alias.toLowerCase())

    const aliasUser = await prisma.user.findUnique({
      where: { slug: data.slug },
    })
    if (aliasUser && aliasUser.id !== user.id) {
      throw new AuthenticationError(ALIAS_TAKEN)
    }

    if (isCreator(user)) {
      if (input.portfolio) {
        data.portfolio = await populatePortfolioData(input.portfolio)
      }

      if (input.websiteUrl !== user.websiteUrl) {
        // TODO: if video is youtube or tiktok, update creatorStats from parsing url.
      }
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...data,
        ...(data.password && { password: createPassword(data.password) }),
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
    t.string('password')
    t.string('bannerUrl')
    t.field('portfolio', {
      type: list('JSON'),
    })
    t.string('about')
    t.string('genre')
    t.string('tiktokUrl')
    t.string('youtubeUrl')
    t.string('instagramUrl')
    t.string('facebookUrl')
  },
})

export const profileBySlug = queryField('profileBySlug', {
  type: 'User',
  args: { slug: stringArg() },
  resolve: async (_, { slug }) => prisma.user.findUnique({ where: { slug } }),
})
