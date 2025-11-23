import React, { useState } from 'react';
import { charge } from '../api/payments';
import { useLocation } from 'react-router-dom';

export default function PaymentsPage(){
  const loc = useLocation();
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const orderId = loc.state?.orderId;
  const amount = loc.state?.amount;

  async function pay(){
    setLoading(true);
    try {
      const res = await charge({ orderId, amount, method });
      alert('Payment: ' + JSON.stringify(res));
    } catch(err){
      alert('Payment failed: ' + (err.message || err));
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h3>Payments</h3>
      <div>Order: {orderId}</div>
      <div>Amount: ₹{amount}</div>
      <div>
        <label>
          <input type="radio" checked={method==='card'} onChange={()=>setMethod('card')} /> Card
        </label>
        <label style={{marginLeft:8}}>
          <input type="radio" checked={method==='upi'} onChange={()=>setMethod('upi')} /> UPI
        </label>
      </div>
      <button onClick={pay} disabled={!orderId}>Pay</button>
    </div>
  );
}
