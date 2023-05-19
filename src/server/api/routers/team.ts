import { z } from "zod";
import { updateTeamInput } from "../../../types";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  getTeamMembers: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.team.findMany({
          where: {
            members: {
              some: {
                email: input.email,
              },
            },
          },
          select: {
            id: true,
            name: true,
            description: true,
            members: true,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  updateTeamInfo: protectedProcedure
    .input(updateTeamInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.team.update({
          where: {
            id: input.teamId,
          },
          data: {
            name: input.name,
            description: input.description,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
