import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.findUnique({
          where: {
            username: input.username,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getUserByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  editUser: protectedProcedure
    .input(
      z.object({
        username: z.string().optional(),
        name: z.string().optional(),
        bio: z.string().optional(),
        links: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            username: input.username,
            name: input.name,
            bio: input.bio,
            links: input.links,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  isUsernameAvailable: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            username: input.username,
          },
        });

        if (user) {
          return false;
        }

        return true;
      } catch (error) {
        console.log("error", error);
      }
    }),

  updateProfilePicture: protectedProcedure
    .input(
      z.object({
        profilePicture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            image: input.profilePicture,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
