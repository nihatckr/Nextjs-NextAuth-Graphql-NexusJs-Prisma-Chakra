import { fieldAuthorizePlugin, makeSchema } from 'nexus'
import { join } from 'path'
import { applyMiddleware } from 'graphql-middleware'

import * as types from './types'
import { permissions } from './permissions'

const baseschema = makeSchema({
    types,
    outputs: {
        typegen: join(process.cwd(), 'graphql', 'generated/nexus-typegen.ts'),
        schema: join(process.cwd(), 'graphql', 'generated/schema.graphql'),
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
    plugins: [

        fieldAuthorizePlugin(),
    ]
})

export const schema = applyMiddleware(baseschema, permissions)