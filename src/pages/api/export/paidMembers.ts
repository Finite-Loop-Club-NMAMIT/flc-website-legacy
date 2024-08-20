import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const paidMembersDetails = await prisma.user.findMany({
      where: {
        isMember: true,
        Registrations: {
          some: {
            OR: [
              {
                yearOfReg: 2024,
              },
              {
                yearOfReg: 2023,
              },
            ],
          },
        },
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });

    const csvRows = [];
    csvRows.push("Name,Email,Phone,USN");

    const usernameRegex = /^(nnm22|nnm23)/;

    for (const member of paidMembersDetails) {
      if (member == null) continue;
      const { name, email, phone } = member;

      const usn = email?.split("@")[0];

      if (!usernameRegex.test(usn!)) continue;

      csvRows.push(`Member ${name},${email},${phone},${usn}`);
    }

    const csvString = csvRows.join("\n");

    res.status(200).send(csvString);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}
