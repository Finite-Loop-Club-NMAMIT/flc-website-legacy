import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res) {
    res.status(200).json({ name: 'John Doe' })
    const data = await prisma.team.findUnique({
        where: {
            id: 1
        }
    });
    const users = await prisma.user.findMany({
        where: {
            teamId: 1
        }
    });
    console.log(users);
}
