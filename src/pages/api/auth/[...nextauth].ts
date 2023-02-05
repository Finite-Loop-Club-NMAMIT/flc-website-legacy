import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  secret: env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: "dark",
    brandColor: "#facc15",
    logo: "https://res.cloudinary.com/dpfpk49oa/image/upload/v1661426777/logo2_fpkrl6.png",
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (user.email?.endsWith("@nmamit.in")) {
        const member = await prisma.members.findUnique({
          where: {
            email: user.email,
          },
        });

        if (member) {
          await prisma.user.update({
            where: {
              email: user.email,
            },
            data: {
              role: "member",
            },
          });
        }

        if (isNewUser) {
          let username = user.email.split("@")[0];
          let userCreated = false;

          while (!userCreated) {
            try {
              await prisma.user.update({
                where: { email: user.email },
                data: { username },
              });
              userCreated = true;
            } catch (err) {
              username += nanoid();
            }
          }
        }
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
