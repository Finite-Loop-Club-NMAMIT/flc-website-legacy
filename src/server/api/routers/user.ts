import { z } from "zod";
import { editUserInput } from "../../../types";

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

  getMembers: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        searchTerms: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, searchTerms, cursor } = input;
      const users = await ctx.prisma.user.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        where: {
          isMember: true,
          role: "member",
          OR: [
            {
              username: {
                contains: searchTerms,
              },
            },
            {
              name: {
                contains: searchTerms,
              },
            },
            {
              email: {
                contains: searchTerms,
              },
            },
          ],
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextItem = users.pop();
        nextCursor = nextItem?.id;
      }
      return {
        users,
        nextCursor,
      };
    }),

  editUser: protectedProcedure
    .input(editUserInput)
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
