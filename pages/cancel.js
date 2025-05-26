// pages/cancel.js
export default function CancelPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>❌ Checkout Canceled</h1>
      <p>Your reservation has not been completed.</p>
      <p>No seats were held or charged.</p>
      <a href="/reserve" style={{ color: 'blue', textDecoration: 'underline' }}>
        Return to Seat Selection
      </a>
    </div>
  );
}

