// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../libs/prisma"

export default async function handler(req, res) {

    console.log(req.body)
    if (req.method !== 'POST') {
        return res.status(405).send({ message: 'Only POST requests allowed' })
    }
    try {
        const payment = await prisma.registrationPayment.update({
            where: {
                orderId: req.body.payload.payment.entity.order_id
            },
            data: {
                paid: true,
                paymentData: req.body
            }
        })

        const user = await prisma.user.update({
            where: {
                id: payment.userId
            },
            data: {
                isMember: true
            }
        })
        return res.status(200).json({ status: "OK" })

    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}