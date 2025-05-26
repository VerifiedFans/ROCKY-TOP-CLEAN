// pages/api/seats.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const seats = await prisma.seat.findMany({
      include: {
        row: {
          select: {
            rowNumber: true,
            section: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const formatted = seats.map(seat => ({
      id: seat.id,
      seatNumber: seat.seatNumber,
      available: seat.available,
      section: seat.row.section.name,
      row: String.fromCharCode(64 + seat.row.rowNumber), // Converts rowNumber to letter (e.g., 1 -> 'A')
    }));

    res.status(200).json({ seats: formatted });
  } catch (error) {
    console.error('Error fetching seats:', error);
    res.status(500).json({ error: 'Could not fetch seats' });
  } finally {
    await prisma.$disconnect();
  }
}

