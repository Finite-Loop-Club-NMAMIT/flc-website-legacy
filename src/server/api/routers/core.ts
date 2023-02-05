import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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

  getAllCoreMembers: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.core.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),

  addCoreMember: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        role: z.enum([
          "Principal",
          "AssistantProfessor",
          "President",
          "VicePresident",
          "Secretary",
          "JointSecretary",
          "EventsHead",
          "EventsCoHead",
          "TalentAcquisitionHead",
          "TechnicalHead",
          "DigitalTechLead",
          "EthicalHackingHead",
          "ProgramAdvisor",
          "ProgramLead",
          "GraphicsHead",
          "GraphicsCoHead",
          "SocialMediaHead",
          "SocialMediaCoHead",
          "ContentHead",
          "ContentCoHead",
          "GraphicsTeam",
          "SocialMediaTeam",
          "ContentTeam",
          "TechnicalContentHead",
          "TechnicalTeam",
          "CoreMember",
        ]),
        img: z.string(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        filter: z.enum([
          "Year2017to2020",
          "Year2020to2021",
          "Year2021to2022",
          "Year2022to2023",
          "Faculty",
        ]),
      })
    )
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

  deleteCoreMember: protectedProcedure
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
