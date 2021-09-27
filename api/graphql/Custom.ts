import { JSONResolver, DateTimeResolver } from 'graphql-scalars'
import { asNexusMethod } from 'nexus'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

// https://github.com/graphql-nexus/nexus/issues/825
export const JSON = asNexusMethod(JSONResolver, 'JSON')
