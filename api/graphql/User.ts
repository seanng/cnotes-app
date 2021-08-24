import { objectType, enumType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('_id')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.field('role', {
      type: 'UserRole', // from Enums
    })
  },
})

export const UserRole = enumType({
  name: 'UserRole',
  members: ['CREATOR', 'BRAND'],
})
