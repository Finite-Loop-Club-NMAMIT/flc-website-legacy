import { z } from "zod";
import { addCoreMemberInput, getCoreMembersInput } from "../../../types";

import { createTRPCRouter, publicProcedure ,adminProcedure} from "../trpc";

export const coreRouter = createTRPCRouter({
  getCoreMembers: publicProcedure
    .input(getCoreMembersInput)
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

  getAllCoreMembers: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.core.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),

  addCoreMember: adminProcedure
    .input(addCoreMemberInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.core.create({
          data: {
            name: input.name,
            role: input.role,
            img: input.img,
            github: input.github,
            linkedin: input.linkedin,
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  deleteCoreMember: adminProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {        
        return await ctx.prisma.core.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
