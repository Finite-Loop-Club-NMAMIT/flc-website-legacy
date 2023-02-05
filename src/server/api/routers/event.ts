import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure
    .input(
      z.object({
        filter: z.optional(
          z.enum([
            "Year2017to2020",
            "Year2020to2021",
            "Year2021to2022",
            "Year2022to2023",
          ]) || undefined
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.findMany({
          where: {
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getAllEvents: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.event.findMany();
    } catch (error) {
      console.log("error", error);
    }
  }),

  addEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        date: z.date(),
        attended: z.number(),
        type: z.enum([
          "Workshop",
          "Seminar",
          "Gaming",
          "Talk",
          "CyberSecurity",
          "OpenSource",
          "AndroidDevelopment",
          "WebDevelopment",
        ]),
        image: z.string(),
        organizer: z.string(),
        description: z.string(),
        filter: z.enum([
          "Year2017to2020",
          "Year2020to2021",
          "Year2021to2022",
          "Year2022to2023",
        ]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.create({
          data: {
            name: input.name,
            date: input.date,
            attended: input.attended,
            type: input.type,
            image: input.image,
            organizer: input.organizer,
            description: input.description,
            filter: input.filter,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  deleteEvent: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.event.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
