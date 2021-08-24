import { objectType, arg, inputObjectType } from 'nexus'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prisma from 'lib/prisma'

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        input: arg({ type: 'SignupInput' }),
      },
      resolve: async (_, { input }, __) => {
        const { email, password, role, ...profileArgs } = input
        const hashedPassword = await hash(password, 10)
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

        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
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
