import { objectType, enumType } from 'nexus'

enumType({
  name: 'UserRole',
  members: ['CREATOR', 'BRAND'],
})

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('_id')
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.field('role', {
      type: 'UserRole',
    })
  },
})
