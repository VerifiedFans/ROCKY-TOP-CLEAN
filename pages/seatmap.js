// pages/seatmap.js
import { useEffect } from 'react';

export default function SeatmapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.seatmap.pro/seamless.js';
    script.async = true;
    script.onload = () => {
      window.seatmappro.init({
        containerId: 'seatmap-container',
        publicApiKey: process.env.NEXT_PUBLIC_SEATMAP_API_KEY,
        venueId: parseInt(process.env.NEXT_PUBLIC_SEATMAP_VENUE_ID),
        schemaId: parseInt(process.env.NEXT_PUBLIC_SEATMAP_SCHEMA_ID),
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Interactive Seat Map</h1>
      <div id="seatmap-container" style={{ width: '100%', height: '700px' }}></div>
    </div>
  );
}
