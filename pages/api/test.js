// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log(req.method, req.body);
  if (req.method !== 'POST') {

    console.log(session.user)
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session.user) {
    console.log(session.user)
    if (session.user) {
      const body = JSON.parse(req.body)
      console.log(body)
      const { name, description, members } = body

      const users = await prisma.team.create({
        data: {
          name,
          description,
          members: {
            connect: members
          }
        }
      });
      console.log(users);
      res.status(200).json({ message: 'Team Created', data: users })
      return
    }
  }
  res.status(401).json({ message: 'No Permission to create Team' })
  return
}
