import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
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

  awardCertificates: protectedProcedure
    .input(awardCertificateInput)
    .mutation(async ({ ctx, input }) => {
      try {
        const isAdmin = await ctx.prisma.user.findFirst({
          where: {
            id: ctx.session.user.id,
            isAdmin: true,
          },
        });

        if (!isAdmin) {
          throw new Error("You are not an admin");
        }

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
});
