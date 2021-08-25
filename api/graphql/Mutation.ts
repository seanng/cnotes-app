import { objectType, arg, inputObjectType } from 'nexus'
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

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        input: arg({ type: 'SignupInput' }),
      },
      resolve: async (_, { input }, { res }) => {
        const { email, password, role, ...profileArgs } = input
        const foundUser = await prisma.user.findUnique({
          where: { email },
        })
        if (foundUser) {
          throw new AuthenticationError(EMAIL_TAKEN)
        }
        const hashedPassword = createPassword(password)
        const user = await prisma.user.create({
          data: {
            email,
            role,
            password: hashedPassword,
          },
        })

        // create creator or brand profile.
        await prisma[role.toLowerCase()].create({
          data: {
            userId: user.id,
            email,
            ...profileArgs,
          },
        })

        // todo: send welcome email.

        const token = encryptToken(user.id)
        res.setHeader('Set-Cookie', serializeCookie(token))
        return { token, user }
      },
    })
    t.field('login', {
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

        const token = encryptToken(user.id)
        res.setHeader('Set-Cookie', serializeCookie(token))
        return { token, user }
      },
    })
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
