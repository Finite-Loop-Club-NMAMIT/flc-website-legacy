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

  awardCertificate: protectedProcedure
    .input(awardCertificateInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.certificate.create({
          data: {
            ...input,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
