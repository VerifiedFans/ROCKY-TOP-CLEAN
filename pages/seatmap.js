import { useEffect } from 'react';

export default function SeatmapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.seatmap.pro/seats.js';
    script.async = true;
    script.onload = () => {
      window.seatmappro.init({
        containerId: 'seatmap-container',
        publicApiKey: 'a1e748e2-74a6-40c0-a3f7-7b790c68a34b',
        venueId: 2533,
        schemaId: 5512,
        language: 'en',
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Interactive Seating Chart</h1>
      <div id="seatmap-container" style={{ width: '100%', height: '800px' }} />
    </div>
  );
}
