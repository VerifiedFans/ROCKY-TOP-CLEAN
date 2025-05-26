// pages/reserve.js

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReservePage() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    axios.get('/api/seats').then(res => {
      setSeats(res.data.seats);
    });
  }, []);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const handleCheckout = async () => {
    const email = prompt('Enter your email for checkout:');
    const res = await axios.post('/api/create-checkout-session', {
      seatIds: selectedSeats,
      email,
    });
    window.location.href = `https://checkout.stripe.com/pay/${res.data.sessionId}`;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Select Your Seats</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => toggleSeat(seat.id)}
            disabled={!seat.available}
            style={{
              padding: 10,
              borderRadius: 6,
              cursor: seat.available ? 'pointer' : 'not-allowed',
              background: selectedSeats.includes(seat.id)
                ? 'orange'
                : seat.available
                  ? '#a8e6cf'
                  : '#ddd'
            }}
          >
            {seat.section} Row {seat.row} — #{seat.seatNumber}
          </button>
        ))}
      </div>
      <br />
      <button
        onClick={handleCheckout}
        disabled={selectedSeats.length === 0}
        style={{ padding: '10px 20px', fontSize: 16 }}
      >
        Reserve {selectedSeats.length} seat(s)
      </button>
    </div>
  );
}

