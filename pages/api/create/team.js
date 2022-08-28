// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../libs/prisma"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session.user) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (user.isAdmin) {
            const { name, description, members } = req.body
            const team = await prisma.team.create({
                data: {
                    name, description,
                    members: {
                        connect: members
                    }
                }
            });
            res.status(200).json({ message: 'Team Created', data: team })
            return
        }
    }
    res.status(401).json({ message: 'No Permission to create Team' })
    return
}
