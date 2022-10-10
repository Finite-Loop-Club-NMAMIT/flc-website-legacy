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
    console.log(session);
    if (session.user) {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const payment_capture = 1;
        const amount = 1;
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

            if (user.role === "member" && user.isMember === false) {
                const payment = await prisma.registrationPayment.create({
                    data: {
                        orderId,
                        userId: user.id,
                        amount: amount / 100
                    }
                })
                return res.status(200).json({
                    id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                });
            }
            return res.status(401).json({
                message: "No Permission"
            });
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    }
}