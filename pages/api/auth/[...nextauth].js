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
    theme: {
        colorScheme: "dark",
        brandColor: "#facc15",
        logo: "https://res.cloudinary.com/dpfpk49oa/image/upload/v1661426777/logo2_fpkrl6.png",
    },
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
                            role: "member",
                        },
                    })
                }
            }
        }

    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            return token
        }
    }

}

export default NextAuth(authOptions)