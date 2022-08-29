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
        const { name, bio, links } = req.body
        const user = await prisma.user.update({
            where: {
                email: session.user.email
            },
            data: {
                name,
                bio,
                links,
            },
        })
        res.status(200).json({ message: 'User Updated', data: user })
        return

    }
    res.status(401).json({ message: 'No Permission' })
    return
}
