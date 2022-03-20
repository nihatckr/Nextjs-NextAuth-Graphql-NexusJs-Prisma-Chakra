import NextAuth, { User as NextAuthUser } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextApiHandler } from 'next'

import prisma from "../../../lib/prisma"


interface NextAuthUserWithStringId extends NextAuthUser {
    id: string
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler


const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                return {
                    id: profile.sub.toString(),
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture as string,
                } as NextAuthUserWithStringId
            },

        }),

    ],
    theme: {
        colorScheme: "dark",
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
    }
}