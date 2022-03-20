import { Context } from './context'

export function getUserId(ctx: Context) {
    const userId = ctx.userId
    return userId
}