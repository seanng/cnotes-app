import { makeSchema } from 'nexus'
import path from 'path'
import * as types from './graphql'

// outputs a schemalink schema
export const schema = makeSchema({ types })

// does not output a schemalink schema
export default makeSchema({
  types,
  outputs: {
    typegen: path.join(process.cwd(), 'generated/nexus-typegen.ts'),
    schema: path.join(process.cwd(), 'generated/schema.graphql'),
  },
})
