import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const coreRouter = createTRPCRouter({
  getCoreMembers: publicProcedure
    .input(
      z.object({
        filter: z.enum([
          "Year2017to2020",
          "Year2020to2021",
          "Year2021to2022",
          "Year2022to2023",
          "Faculty",
        ]),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.core.findMany({
          where: {
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
