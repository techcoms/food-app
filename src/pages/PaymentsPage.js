import React, { useState } from 'react';
import { charge } from '../api/payments';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentsPage() {
  const loc = useLocation();
  const navigate = useNavigate();

  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  const orderId = loc.state?.orderId;
  const amount = loc.state?.amount;

  const formatINR = (v) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(v || 0);

  async function pay() {
    if (!orderId || !amount) return;

    setLoading(true);
    try {
      const res = await charge({ orderId, amount, method });
      alert(`Payment successful\nTransaction: ${res.txId || 'N/A'}`);

      // Optional: redirect after payment
      navigate('/orders', { replace: true });
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    } finally {
      setLoading(false);
    }
  }

  // Guard: user refreshed or came directly
  if (!orderId || !amount) {
    return (
      <div>
        <h3>Payments</h3>
        <p>Invalid payment session.</p>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div>
      <h3>Payments</h3>

      <div>Order: {orderId}</div>
      <div>Amount: {formatINR(amount)}</div>

      <div style={{ marginTop: 8 }}>
        <label>
          <input
            type="radio"
            checked={method === 'card'}
            onChange={() => setMethod('card')}
          />{' '}
          Card
        </label>

        <label style={{ marginLeft: 8 }}>
          <input
            type="radio"
            checked={method === 'upi'}
            onChange={() => setMethod('upi')}
          />{' '}
          UPI
        </label>
      </div>

      <button
        onClick={pay}
        disabled={loading}
        style={{ marginTop: 8 }}
      >
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </div>
  );
}
