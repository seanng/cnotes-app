import { asNexusMethod } from 'nexus'
import { DateTimeResolver } from 'graphql-scalars'

export default asNexusMethod(DateTimeResolver, 'date')
