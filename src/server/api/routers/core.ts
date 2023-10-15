import { z } from "zod";
import { addCoreMemberInput , getCoreMembersInput, editCoreMemberInput } from "../../../types";

import { createTRPCRouter, publicProcedure ,adminProcedure} from "../trpc";
import { deleteImage } from "../../../utils/cloudinary";

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
  
    editCore: adminProcedure
    .input(editCoreMemberInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const existingCore = await ctx.prisma.core.findUnique({
          where: { id: input.id },
        });
        if (!existingCore)
          throw new Error("Core member not found");
        if (existingCore.img != input.img)
          await deleteImage(existingCore.img).catch((err) => { console.log(err) });

        return await ctx.prisma.core.update({
          where: { id: input.id },
          data: {
            name: input.name,
            role: input.role,
            img: input.img,
            github: input.github,
            linkedin: input.linkedin,
            filter: input.filter,
          }
        });
      } catch (error) {
        console.log("error", error)
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
        const core = await ctx.prisma.core.findFirst({ where: { id: input.id } })
        core && await deleteImage(core.img).catch((err) => { console.log(err) })

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
