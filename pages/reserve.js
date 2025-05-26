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
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Select Your Seats</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(45px, 1fr))',
          gap: 6,
          justifyItems: 'center',
        }}
      >
        {seats.map((seat) => (
          <button
            key={seat.id}
            onClick={() => toggleSeat(seat.id)}
            disabled={!seat.available}
            style={{
              width: 45,
              height: 45,
              fontSize: 10,
              borderRadius: 4,
              border: '1px solid #999',
              cursor: seat.available ? 'pointer' : 'not-allowed',
              background: selectedSeats.includes(seat.id)
                ? '#ffa500'
                : seat.available
                ? '#a8e6cf'
                : '#eee'
            }}
            title={`Section ${seat.section}, Row ${seat.row}, Seat ${seat.seatNumber}`}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <button
          onClick={handleCheckout}
          disabled={selectedSeats.length === 0}
          style={{
            padding: '12px 24px',
            fontSize: 16,
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Reserve {selectedSeats.length} seat(s)
        </button>
      </div>
    </div>
  );
}


