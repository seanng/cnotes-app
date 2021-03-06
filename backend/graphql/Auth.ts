import pick from 'ramda/src/pick'
import jwt from 'jsonwebtoken'
import slugify from 'slugify'
import {
  objectType,
  arg,
  inputObjectType,
  mutationField,
  nonNull,
  stringArg,
} from 'nexus'
import { User } from '@prisma/client'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import {
  BRAND,
  EMAIL_TAKEN,
  INCORRECT_PASSWORD,
  INVALID_TOKEN,
  UNVERIFIED,
  userTokenFields,
  USER_NOT_FOUND,
} from 'shared/constants'
import {
  sendForgotPasswordEmail,
  sendUserActivityNotificationEmail,
  sendBrandWelcomeEmail,
} from 'utils/emails'
import prisma from 'lib/prisma'
import {
  createPassword,
  encryptToken,
  isCorrectPassword,
  serializeCookie,
} from 'utils/auth'
import { Token } from 'shared/types'

export const Signup = mutationField('signup', {
  type: 'AuthPayload',
  args: {
    input: arg({ type: 'SignupInput' }),
  },
  resolve: async (_, { input }, { res }) => {
    const foundUser = await prisma.user.findUnique({
      where: { email: input.email },
    })
    if (foundUser) {
      throw new AuthenticationError(EMAIL_TAKEN)
    }
    const now = new Date()
    const isBrand = input.role === BRAND
    const user = await prisma.user.create({
      data: {
        ...input,
        password: createPassword(input.password),
        ...(!isBrand && {
          portfolio: [],
          statsLastVerifiedAt: null,
        }),
        slug: slugify(input.alias.toLowerCase()),
        status: UNVERIFIED,
        createdAt: now,
        updatedAt: now,
      },
    })
    if (process.env.VERCEL_ENV === 'production') {
      if (isBrand) {
        await sendBrandWelcomeEmail(input.email, input.firstName)
      }
      // TODO: send creator welcome email.
      await sendUserActivityNotificationEmail(user, now, 'SIGN UP')
    }
    const userObj = pick(userTokenFields, user) as User
    const token = encryptToken(userObj)
    res.setHeader('Set-Cookie', serializeCookie(token))
    return { token, user }
  },
})

export const Login = mutationField('login', {
  type: 'AuthPayload',
  args: {
    input: arg({ type: 'LoginInput' }),
  },
  resolve: async (_, { input }, { res }) => {
    const { email, password } = input
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) {
      throw new AuthenticationError(USER_NOT_FOUND)
    }
    if (!isCorrectPassword(password, user.password)) {
      throw new UserInputError(INCORRECT_PASSWORD)
    }
    const userObj = pick(userTokenFields, user) as User
    const token = encryptToken(userObj)
    res.setHeader('Set-Cookie', serializeCookie(token))
    if (process.env.VERCEL_ENV === 'production') {
      await sendUserActivityNotificationEmail(user, new Date(), 'LOGIN')
    }
    return { token, user }
  },
})

export const Signout = mutationField('signOut', {
  type: 'Boolean',
  resolve: async (_, __, { res }) => {
    res.setHeader('Set-Cookie', serializeCookie('', -1))
    return true
  },
})

export const ForgotPassword = mutationField('forgotPassword', {
  type: 'Boolean',
  args: {
    input: nonNull(stringArg()),
  },
  resolve: async (_, { input }, ___) => {
    const user = await prisma.user.findUnique({
      where: { email: input },
    })
    if (!user) {
      throw new AuthenticationError(USER_NOT_FOUND)
    }
    const token = encryptToken(user)
    await sendForgotPasswordEmail(input, token)
    return true
  },
})

export const ResetPassword = mutationField('resetPassword', {
  type: 'Boolean',
  args: {
    input: arg({ type: 'ResetPasswordInput' }),
  },
  resolve: async (_, { input }, { res }) => {
    const { token, password } = input

    try {
      const { user } = jwt.verify(token, process.env.JWT_SECRET) as Token
      const foundUser = await prisma.user.findFirst({
        where: { id: user.id, password: user.password },
      })

      if (!foundUser) {
        throw new AuthenticationError(USER_NOT_FOUND)
      }

      const newUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          password: createPassword(password),
          updatedAt: new Date(),
        },
      })
      const userObj = pick(userTokenFields, newUser) as User
      const newToken = encryptToken(userObj)
      res.setHeader('Set-Cookie', serializeCookie(newToken))
      return true
    } catch (error) {
      throw new AuthenticationError(INVALID_TOKEN)
    }
  },
})

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

export const SignupInput = inputObjectType({
  name: 'SignupInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('role')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('alias')
    t.string('websiteUrl')
  },
})

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email')
    t.string('password')
  },
})

export const ResetPasswordInput = inputObjectType({
  name: 'ResetPasswordInput',
  definition(t) {
    t.nonNull.string('token')
    t.nonNull.string('password')
  },
})
