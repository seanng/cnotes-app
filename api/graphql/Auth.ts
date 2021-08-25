import * as R from 'ramda'
import { objectType, arg, inputObjectType, mutationField } from 'nexus'
import prisma from 'lib/prisma'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import {
  EMAIL_TAKEN,
  INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from 'shared/constants'
import {
  createPassword,
  encryptToken,
  isCorrectPassword,
  serializeCookie,
} from 'utils/auth'

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
    const user = await prisma.user.create({
      data: {
        ...input,
        password: createPassword(input.password),
        status: 'UNVERIFIED',
      },
    })

    // todo: send welcome email.
    const userWithoutPassword = R.omit(['password'], user)

    const token = encryptToken(userWithoutPassword)
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

    const token = encryptToken(user)
    res.setHeader('Set-Cookie', serializeCookie(token))
    return { token, user }
  },
})

export const Signout = mutationField('signOut', {
  type: 'Boolean',
  args: {
    input: arg({ type: 'LoginInput' }),
  },
  resolve: async (_, __, { res }) => {
    res.setHeader('Set-Cookie', serializeCookie('', -1))
    return true
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
    t.string('companyName')
  },
})

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})
