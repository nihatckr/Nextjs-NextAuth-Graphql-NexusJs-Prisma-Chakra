import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from './types'

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(process.cwd(), 'graphql', 'generated/nexus-typegen.ts'), // 2
        schema: join(process.cwd(), 'graphql', 'generated/schema.graphql'), // 3
    },
    contextType: {
        export: "Context",
        module: join(process.cwd(), "graphql", "./context.ts"),
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})