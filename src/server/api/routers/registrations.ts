import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const registrationRouter = createTRPCRouter({
  getFormResponses: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        searchTerms: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, searchTerms, cursor } = input;
      const forms = await ctx.prisma.registrations.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { userId: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        include: {
          User: {
            select: {
              name: true,
              year: true,
              links: true,
              phone: true,
              email: true,
              isMember: true,
            },
          },
        },
        where: {
          User: {
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
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (forms.length > limit) {
        const nextItem = forms.pop();
        nextCursor = nextItem?.userId;
      }
      return {
        forms,
        nextCursor,
      };
    }),

  getRegistrationCount: publicProcedure
    .input(
      z.object({
        yearOfReg: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const regCount = await ctx.prisma.registrations.count({
          where: {
            yearOfReg: input.yearOfReg,
            User: {
              isMember: true,
            },
          },
        });

        return regCount;
      } catch (error) {
        console.log("error", error);
      }
    }),
});

export type RegistrationRouter = typeof registrationRouter;
