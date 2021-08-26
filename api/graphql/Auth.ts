import * as R from 'ramda'
import { objectType, arg, inputObjectType, mutationField } from 'nexus'
import prisma from 'lib/prisma'
import { UserInputError, AuthenticationError } from 'apollo-server-micro'
import {
  EMAIL_TAKEN,
  INCORRECT_PASSWORD,
  UNVERIFIED,
  USER_NOT_FOUND,
} from 'shared/constants'
import {
  createPassword,
  encryptToken,
  isCorrectPassword,
  serializeCookie,
} from 'utils/auth'
import { User } from 'shared/types'

// should match up with User.
const publicFields = [
  'id',
  'role',
  'firstName',
  'lastName',
  'companyName',
  'email',
  'status',
]

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
        // until integrating with https://github.com/prisma/nexus-prisma/, prisma schema doesnt work
        status: UNVERIFIED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
    // todo: send welcome email.
    const userObj = R.pick(publicFields, user) as User
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

    const userObj = R.pick(publicFields, user) as User
    const token = encryptToken(userObj)
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
