import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const paidMembers = await prisma.registrationPayment.findMany({
    where: {
      paid: true,
    },
  });
  const paidMembersDetails: {
    username: string;
    name: string;
    email: string;
  }[] = [];
  for (const member of paidMembers) {
    const memberDetails = await prisma.user.findUnique({
      where: {
        id: member.userId,
      },
      select: {
        username: true,
        name: true,
        email: true,
      },
    });
    if (memberDetails) {
      const { username, name, email } = memberDetails;
      paidMembersDetails.push({
        username: username as string,
        name: name as string,
        email: email as string,
      });
    }
  }

  const csvRows = [];
  csvRows.push("Username,Name,Email");

  for (const member of paidMembersDetails) {
    if (member == null) continue;
    csvRows.push(`${member.username},${member.name},${member.email}`);
    console.log(member.username);
  }

  const csvString = csvRows.join("\n");

  res.status(200).send(csvString);
}
