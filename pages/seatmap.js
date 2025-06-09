useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://cdn.seatmap.pro/sdk/v1.js'; // ❌ outdated
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
