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
        where: {
          skills: {
            array_contains: searchTerms,
          },
          expectations: {
            contains: searchTerms,
          },
          languages: {
            array_contains: searchTerms,
          },
          User: {
            OR: [
              { name: searchTerms },
              { username: searchTerms },
              { email: searchTerms },
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
          },
        });

        return regCount;
      } catch (error) {
        console.log("error", error);
      }
    }),
});

export type RegistrationRouter = typeof registrationRouter;
