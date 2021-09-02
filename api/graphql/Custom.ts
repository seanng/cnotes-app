import { DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod, scalarType } from 'nexus'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

// https://github.com/graphql-nexus/nexus/issues/825
export const Json = scalarType({
  name: 'Json',
  asNexusMethod: 'json',
  description: 'JSON custom scalar type',
  parseValue(value) {
    return value
  },
  serialize(value) {
    return value
  },
  parseLiteral(valueNode) {
    return valueNode.loc
  },
})
