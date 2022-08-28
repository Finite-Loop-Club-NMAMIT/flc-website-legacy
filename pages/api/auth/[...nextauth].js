import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    events: {
        async signIn({ user, account, profile, isNewUser }) {
            if (user.email.endsWith("@nmamit.in")) {
                const member = await prisma.members.findUnique({
                    where: {
                        email: user.email,
                    },
                })
                if (member) {
                    const updateUser = await prisma.user.update({
                        where: {
                            email: user.email,
                        },
                        data: {
                            isMember: true,
                        },
                    })
                }
            }
        }
    }
}

export default NextAuth(authOptions)