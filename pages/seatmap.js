// pages/seatmap.js

import { useEffect } from 'react';

export default function SeatmapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.seatmap.pro/build/latest/seatmap.min.js';
    script.async = true;

    script.onload = () => {
      // Mount seatmap after script is loaded
      const seatmap = window.seatmap.mount({
        publicApiKey: 'a1e748e2-74a6-40c0-a3f7-7b790c68a34b',
        containerId: 'seatmap-container',
        schemaId: '5512',
        venueId: '2533',
        showLegend: true,
      });
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div>
      <h1>Interactive Seat Map</h1>
      <div
        id="seatmap-container"
        style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
      ></div>
    </div>
  );
}
