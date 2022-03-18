import { asNexusMethod, extendType, objectType } from "nexus"
import { DateTimeResolver } from 'graphql-scalars'

export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const User = objectType({
    name: 'User',
    definition(t) {
        t.int('id')
        t.string('email')
        t.date('emailVerified')
        t.string('image')
        /*    t.list.field('accounts', {
             type: Accounts,  
             resolve(root, args, ctx) {
               return null
             },
           })     
           t.list.field('sessions', {
             type: Accounts,  
             resolve(root, args, ctx) {
               return null
             },
           })      */
    },
})

export const PostQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('allUsers', {
            type: User,
            resolve() {
                return [{ id: 1, email: 'Nexus', emailVerified: '...', image: "false" }]
            },
        })
    },
})