import { PrismaClient } from '@prisma/client';

const prisma = global.prisma ||
    new PrismaClient({
        log: ['query'],
    });

export default prisma;
if (process.env.NODE_ENV !== 'production')
    global.prisma = prisma;
