// pages/api/reservations.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') return res.status(405).end();
  if (!id) return res.status(400).json({ error: 'Missing session ID' });

  try {
    const reservation = await prisma.reservation.findFirst({
      where: { checkoutSessionId: id },
      include: {
        reservedSeats: {
          include: {
            seat: {
              include: {
                row: {
                  include: {
                    section: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!reservation) return res.status(404).json({ error: 'Not found' });

    res.status(200).json({ reservation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reservation' });
  } finally {
    await prisma.$disconnect();
  }
}
