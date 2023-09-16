import { z } from "zod";

import { createTRPCRouter, publicProcedure,adminProcedure } from "../trpc";
import { awardCertificateInput } from "../../../types";

export const certificateRouter = createTRPCRouter({
  getCertificateById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.certificate.findFirst({
          where: {
            id: input.id,
          },
          include: {
            user: true,
            event: true,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  awardCertificates: adminProcedure
    .input(awardCertificateInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const certificates = await Promise.all(
          input.userIds.map((userId) =>
            ctx.prisma.certificate.create({
              data: {
                desc: input.desc,
                date: new Date(),
                type: input.type,
                user: {
                  connect: {
                    id: userId,
                  },
                },
                event: {
                  connect: {
                    id: input.eventId,
                  },
                },
              },
            })
          )
        );

        return certificates;
      } catch (error) {
        console.log("error", error);
      }
    }),

  getCertificatesByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.certificate.findMany({
          where: {
            userId: input.userId,
          },
          include: {
            user: true,
            event: true,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
