// pages/api/manual-seed.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const event = await prisma.event.create({
      data: {
        name: "Manual Seed Event",
        description: "Seeded via /api/manual-seed",
        startDate: new Date("2025-06-26T10:00:00Z"),
        endDate: new Date("2025-06-28T23:00:00Z"),
      }
    });

    res.status(200).json({ message: '✅ Manual seeding complete', eventId: event.id });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).json({ error: 'Seeding failed', details: error.message });
  } finally {
    await prisma.$disconnect();
  }
}


