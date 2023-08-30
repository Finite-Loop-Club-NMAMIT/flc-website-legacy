/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { prisma } from "../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { extractStudentDetailsFromEmail } from "../../../utils/details";
import { env } from "../../../env/server.mjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }
  const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;
  const webhookSignature = req.headers["x-razorpay-signature"] as string;
  if (
    !validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      webhookSecret
    )
  ) {
    return res.status(400).send({ message: "Invalid request" });
  }
  try {
    const order_id =
      (req.body?.payload?.payment?.entity?.order_id as string) || undefined;
    const status = req.body?.payload?.payment?.entity?.status as string;
    if (!order_id || !status) {
      return res.status(400).send({ message: "Invalid request" });
    }
    if (status === "captured") {
      // find payment order from two tables
      const paymentOrder = await prisma.registrationPayment.findUnique({
        where: {
          orderId: order_id,
        },
      });

      if (paymentOrder) {
        const updatedPaymentOrder = await prisma.registrationPayment.update({
          where: {
            orderId: order_id,
          },
          data: {
            paid: true,
            paymentData: req.body.payload.payment.entity.paymentData as object,
          },
        });
        const updatedUser = await prisma.user.update({
          where: {
            id: paymentOrder.userId,
          },
          data: {
            role: "member",
            isMember: true,
          },
        });
        if (!updatedUser)
          return res.status(400).json({ message: "User not found" });

        await prisma.members.create({
          data: {
            email: updatedUser.email!,
            name: updatedUser.name,
            batch: extractStudentDetailsFromEmail(updatedUser.email!).batch,
          },
        });

        return res.status(200).json(updatedPaymentOrder);
      }
      return res.status(400).json({ message: "Payment order not found" });
    }
  } catch (err) {
    return res.status(400).json(err);
  }
}
