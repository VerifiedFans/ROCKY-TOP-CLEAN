if (req.method !== 'POST') return res.status(405).end('Only POST allowed');
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const GA_ROWS = 32;
const GA_SEATS = 12;
const VIP_LAYOUT = {
  "101": [3, 5, 7, 9, 11, 13, 15, 17, 17, 14, 12, 11, 9],
  "102": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "103": [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  "104": [3, 5, 7, 9, 11, 13, 15, 17, 17, 14, 12, 11, 9]
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    const event = await prisma.event.create({
      data: {
        name: "Annual Festival 2025",
        description: "Our signature three-day festival with performances, activities, and more!",
        startDate: new Date("2025-06-26T10:00:00Z"),
        endDate: new Date("2025-06-28T23:00:00Z"),
      }
    });

    const days = await Promise.all([
      prisma.eventDay.create({ data: { name: "Thursday", date: new Date("2025-06-26T10:00:00Z"), eventId: event.id } }),
      prisma.eventDay.create({ data: { name: "Friday", date: new Date("2025-06-27T10:00:00Z"), eventId: event.id } }),
      prisma.eventDay.create({ data: { name: "Saturday", date: new Date("2025-06-28T10:00:00Z"), eventId: event.id } }),
    ]);

    const vipSections = await Promise.all(
      Object.keys(VIP_LAYOUT).map(name =>
        prisma.section.create({
          data: {
            name,
            type: "VIP",
            description: `VIP section ${name}`,
            eventId: event.id
          }
        })
      )
    );

    for (const section of vipSections) {
      const layout = VIP_LAYOUT[section.name];
      for (let i = 0; i < layout.length; i++) {
        const row = await prisma.sectionRow.create({
          data: { rowNumber: i + 1, sectionId: section.id }
        });

        const seatPromises = [];
        for (let seatNum = 1; seatNum <= layout[i]; seatNum++) {
          seatPromises.push(
            prisma.seat.create({
              data: {
                seatNumber: section.name === "101" || section.name === "104" ? layout[i] - seatNum + 1 : seatNum,
                rowId: row.id,
                price: 135,
                threeDay: true,
                available: true
              }
            })
          );
        }
        await Promise.all(seatPromises);
      }
    }

    const gaSections = await Promise.all(
      ["201", "202", "203", "204"].map(name =>
        prisma.section.create({
          data: {
            name,
            type: "GA",
            description: "General Admission section",
            eventId: event.id
          }
        })
      )
    );

    for (const section of gaSections) {
      for (let rowNum = 0; rowNum < GA_ROWS; rowNum++) {
        const row = await prisma.sectionRow.create({
          data: { rowNumber: rowNum + 1, sectionId: section.id }
        });

        const seatPromises = [];
        for (let seatNum = 1; seatNum <= GA_SEATS; seatNum++) {
          seatPromises.push(
            prisma.seat.create({
              data: {
                seatNumber: seatNum,
                rowId: row.id,
                price: 35,
                threeDay: false,
                available: true
              }
            })
          );
        }
        await Promise.all(seatPromises);
      }
    }

    res.status(200).json({ message: '✅ Seeding complete!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    await prisma.$disconnect();
  }
}

