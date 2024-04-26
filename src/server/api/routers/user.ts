import { z } from "zod";
import { editUserInput } from "../../../types";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import Razorpay from "razorpay";
import { env } from "../../../env/server.mjs";

export const userRouter = createTRPCRouter({
  getProfile: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.findUnique({
          where: {
            username: input.username,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getUserByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.findUnique({
          where: {
            email: input.email,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  getMembers: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
        skip: z.number().optional(),
        searchTerms: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, skip, searchTerms, cursor } = input;
      const users = await ctx.prisma.user.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
        where: {
          isMember: true,
          role: "member",
          OR: [
            {
              username: {
                contains: searchTerms,
              },
            },
            {
              name: {
                contains: searchTerms,
              },
            },
            {
              email: {
                contains: searchTerms,
              },
            },
          ],
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (users.length > limit) {
        const nextItem = users.pop();
        nextCursor = nextItem?.id;
      }
      return {
        users,
        nextCursor,
      };
    }),

  editUser: protectedProcedure
    .input(editUserInput)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            username: input.username,
            name: input.name,
            bio: input.bio,
            phone: input.phone,
            branch: input.branch,
            year: input.year,
            links: input.links,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  isUsernameAvailable: publicProcedure
    .input(
      z.object({
        username: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({
          where: {
            username: input.username,
          },
        });

        if (user) {
          return false;
        }

        return true;
      } catch (error) {
        console.log("error", error);
      }
    }),

  updateProfilePicture: protectedProcedure
    .input(
      z.object({
        profilePicture: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            image: input.profilePicture,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  createPaymentOrder: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user) {
      throw new Error("Not logged in");
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (user && user.isMember) {
      throw new Error("User is already a member");
    }

    const razorpay = new Razorpay({
      key_id: env.RAZORPAY_KEY,
      key_secret: env.RAZORPAY_SECRET,
    });
    const amount = 408;
    const payment_capture = 1;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      payment_capture,
    };
    const response = await razorpay.orders.create(options);
    const order = await ctx.prisma.registrationPayment.create({
      data: {
        userId: ctx.session.user.id,
        orderId: response.id,
        paid: false,
        amount: Number(response.amount),
      },
    });
    return order;
  }),

  registrationForm: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        languages: z.array(z.string()),
        skills: z.array(z.string()),
        why: z.string(),
        expectations: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userData = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });

      const links = [
        ...(JSON.parse(userData?.links || "[]") as object[]),
        {
          platform: "Github",
          link: input.github,
        },
        {
          platform: "LinkedIn",
          link: input.linkedin,
        },
      ];

      // eslint-disable-next-line
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
          phone: input.phone,
          links: JSON.stringify(links),
          role: "member",
        },
      });
      const registration = await ctx.prisma.registrations.create({
        data: {
          userId: ctx.session.user.id,
          languages: input.languages,
          skills: input.skills,
          whyJoin: input.why,
          yearOfReg: new Date().getFullYear(),
          expectations: input.expectations,
        },
      });
      return registration;
    }),
});

export type UserRouter = typeof userRouter;
