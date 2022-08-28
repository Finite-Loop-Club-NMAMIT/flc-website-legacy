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
        if (user.role === "team-leader") {
            const { name, description, teamId } = req.body
            const task = await prisma.task.create({
                data: {
                    name, description,
                    team: {
                        connect: {
                            id: teamId
                        }
                    }
                }
            });
            res.status(200).json({ message: 'Team Created', data: task })
            return
        }
    }
    res.status(401).json({ message: 'No Permission to create Task' })
    return
}
