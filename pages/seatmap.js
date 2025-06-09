
// pages/seatmap.js
import { useEffect } from 'react';

export default function SeatmapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.seatmap.pro/sdk/v1.js';
    script.async = true;
    script.onload = () => {
      if (window.Seatmap) {
        window.Seatmap.init({
          venueId: 2533,
          schemaId: 5512,
          publicApiKey: 'a1e748e2-74a6-40c0-a3f7-7b790c68a34b',
          container: '#seatmap-container',
          lang: 'en',
          selectable: true
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Interactive Seat Map</h1>
      <div
        id="seatmap-container"
        style={{
          width: '100%',
          height: '800px',
          border: '1px solid #ccc',
          background: '#f9f9f9'
        }}
      />
    </div>
  );
}
