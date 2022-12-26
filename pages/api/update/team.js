import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session.user) {
    const { name, description, teamName } = req.body;
    const updatedTeam = await prisma.team.update({
      where: {
        name: teamName,
      },
      data: {
        name,
        description,
      },
    });
    res.status(200).json({ message: 'Team Updated', data: updatedTeam });
    return;
  }
  res.status(401).json({ message: 'No Permission' });
  return;
}
