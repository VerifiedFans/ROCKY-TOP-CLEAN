useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.seatmap.pro/widget/v1/seatmap.js'; // ✅ Updated SDK
  script.async = true;
  script.onload = () => {
    const seatmap = new window.Seatmap({
      publicKey: 'a1e748e2-74a6-40c0-a3f7-7b790c68a34b',
      venueId: 2533,
      schemaId: 5512,
      container: '#seatmap-container',
      lang: 'en'
    });

    seatmap.render(); // ✅ Render the map
  };
  document.body.appendChild(script);
}, []);
