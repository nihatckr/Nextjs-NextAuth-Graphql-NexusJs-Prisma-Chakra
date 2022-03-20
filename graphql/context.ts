import { PrismaClient } from '@prisma/client'

import { getSession } from 'next-auth/react'

import prisma from '../lib/prisma'
import { MicroRequest } from 'apollo-server-micro/dist/types';

export interface Context {
    prisma: PrismaClient
    userId: string | null
}


export async function createContext(ctx: { req: MicroRequest }): Promise<Context> {

    const session = await getSession(ctx)
    const email = session?.user?.email
    let userId = null
    if (email) {
        const user = await prisma.user.findUnique({ where: { email } })
        userId = user?.id
    }
    return {
        prisma,
        userId
    }
}
