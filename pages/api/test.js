// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from "@prisma/client";
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const users = await prisma.user.findMany({
    where: {
      isMember: true,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.status(200).json(users)
}