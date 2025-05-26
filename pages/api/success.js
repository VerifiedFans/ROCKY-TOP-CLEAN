// pages/success.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    if (!session_id) return;
    fetch(`/api/reservations?id=${session_id}`)
      .then(res => res.json())
      .then(data => {
        setReservation(data.reservation);
        setLoading(false);
      });
  }, [session_id]);

  if (loading) return <p>Loading your reservation...</p>;
  if (!reservation) return <p>Reservation not found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>✅ Reservation Confirmed</h1>
      <p>Email: {reservation.email}</p>
      <p>Total: ${reservation.totalAmount.toFixed(2)}</p>
      <h2>Your Seats:</h2>
      <ul>
        {reservation.reservedSeats.map(seat => (
          <li key={seat.id}>
            Section {seat.seat.row.section.name} - Row {seat.seat.row.rowNumber} - Seat #{seat.seat.seatNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
