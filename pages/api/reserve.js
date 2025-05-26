import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { seatIds, email } = req.body;

  if (!seatIds?.length || !email) {
    return res.status(400).json({ error: 'Missing seatIds or email' });
  }

  try {
    // Reserve seats by creating a reservation + linking seats
    const reservation = await prisma.reservation.create({
      data: {
        email,
        status: 'pending',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min hold
        totalAmount: 0, // Will calculate below
        reservedSeats: {
          create: seatIds.map((seatId) => ({
            seat: { connect: { id: seatId } }
          }))
        }
      },
      include: {
        reservedSeats: { include: { seat: true } }
      }
    });

    // Calculate total based on seat prices
    const total = reservation.reservedSeats.reduce((sum, s) => sum + s.seat.price, 0);

    // Update total
    await prisma.reservation.update({
      where: { id: reservation.id },
      data: { totalAmount: total }
    });

    res.status(200).json({ reservationId: reservation.id, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reservation failed' });
  } finally {
    await prisma.$disconnect();
  }
}
