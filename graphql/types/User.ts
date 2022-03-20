import { asNexusMethod, extendType, idArg, nonNull, objectType, stringArg } from "nexus"
import { DateTimeResolver } from 'graphql-scalars'
import { getUserId } from "../Utils"


export const DateTime = asNexusMethod(DateTimeResolver, 'date')

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('email')
    t.string('image')
    t.date('createdAt')
    t.date('updatedAt')

  },
})

export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.field('user', {
      type: 'User',
      args: {
        userId: nonNull(stringArg()),
      },

      resolve: (_, args, ctx) => {
        return ctx.prisma.user.findUnique({
          where: { id: args.userId },
        })
      },
    }),
      t.nullable.field('me', {
        type: 'User',
        resolve: (parent, args, ctx) => {
          const userId = getUserId(ctx)
          return ctx.prisma.user.findUnique({
            where: {
              id: userId
            },
          })
        },
      })
  },
})

export const UserMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createOneUser', {
      type: 'User',
      args: {
        name: stringArg(),
        email: nonNull(stringArg()),
      },
      resolve: (_, { name, email }, ctx) => {
        return ctx.prisma.user.create({
          data: {
            name,
            email,
          },
        })
      },
    })
  },
})

