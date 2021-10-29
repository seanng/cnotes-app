import { makeSchema } from 'nexus'
import path from 'path'
import * as types from './graphql'
// import * as User from './graphql/User'
// import * as Auth from './graphql/Auth'
// import * as Listing from './graphql/Listing'
// import * as Offer from './graphql/Offer'
// import * as Custom from './graphql/Custom'
// import * as Deal from './graphql/Deal'
// export * from './Auth'
// export * from './Listing'
// export * from './Offer'
// export * from './Deal'
// export * from './Custom'

// outputs a schemalink schema

// const types = {
//   User,
//   Auth,
//   Listing,
//   Offer,
//   Custom,
//   Deal,
// }

export const schema = makeSchema({ types })

// does not output a schemalink schema
export default makeSchema({
  types,
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
})
