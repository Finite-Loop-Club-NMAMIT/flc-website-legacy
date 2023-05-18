import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { awardCertificateInput } from "../../../types";

export const certificateRouter = createTRPCRouter({
  getCertificateById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.certificate.findFirst({
          where: {
            id: input.id,
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
