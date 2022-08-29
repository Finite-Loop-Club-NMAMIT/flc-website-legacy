// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import prisma from "../../../libs/prisma"

export default async function handler(req, res) {
    console.log(req.body)
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    if (req.body.paylod.payment.entity.status === "captured") {
        const payment = await prisma.registrationPayment.update({
            where: {
                orderId: req.body.paylod.payment.entity.order_id
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
    }
    res.status(200).json()
    return
}