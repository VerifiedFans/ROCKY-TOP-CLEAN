// pages/seatmap.js
import { useEffect } from 'react';
import Head from 'next/head';

export default function SeatmapPage() {
  useEffect(() => {
    const loadRenderer = async () => {
      const { SeatmapBookingRenderer } = await import('@seatmap.pro/renderer');

      const renderer = new SeatmapBookingRenderer({
        container: document.getElementById('seatmap-container'),
        onSeatSelect: (seat) => {
          console.log('Seat selected:', seat);
        },
        onSchemaDataLoaded: () => {
          console.log('Schema data loaded successfully');
        },
      });

      const eventId = 'YOUR_EVENT_ID'; // 🔁 Replace this with your actual event ID
      renderer.loadEvent(eventId);
    };

    loadRenderer();
  }, []);

  return (
    <>
      <Head>
        <title>Interactive Seat Map</title>
      </Head>
      <div style={{ padding: '2rem' }}>
        <h1>Interactive Seat Map</h1>
        <div
          id="seatmap-container"
          style={{
            width: '100%',
            height: '800px',
            border: '1px solid #ccc',
            background: '#f9f9f9',
          }}
        />
      </div>
    </>
  );
}
