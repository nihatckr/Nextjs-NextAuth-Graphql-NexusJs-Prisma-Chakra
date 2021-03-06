import { rule, shield } from 'graphql-shield'

const isAuthenticated = rule({ cache: 'contextual' })(async (parent, args, ctx, info) => {
    return ctx.user !== null
})

export const permissions = shield({
    Query: {
        me: isAuthenticated,

    },
    Mutation: {

    },

})