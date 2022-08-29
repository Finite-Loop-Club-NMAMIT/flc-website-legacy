const Razorpay = require("razorpay");
const shortid = require("shortid");
import { unstable_getServerSession } from "next-auth";
import prisma from "../../libs/prisma";
import { authOptions } from "./auth/[...nextauth]";
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const session = await unstable_getServerSession(req, res, authOptions);
    if (session.user) {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        // Create an order -> generate the OrderID -> Send it to the Front-end
        // Also, check the amount and currency on the backend (Security measure)
        const payment_capture = 1;
        const amount = 200;
        const currency = "INR";
        const options = {
            amount: (amount * 100).toString(),
            currency,
            receipt: shortid.generate(),
            payment_capture,
        };

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email,
                }
            });
            const response = await razorpay.orders.create(options);
            const orderId = response.id
            const payment = await prisma.registrationPayment.create({
                data: {
                    orderId,
                    userId: user.id,
                    amount: amount / 100
                }
            })
            res.status(200).json({
                id: response.id,
                currency: response.currency,
                amount: response.amount,
            });
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }

}