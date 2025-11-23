import React, { useState } from 'react';
import { createOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage(){
  const [name, setName] = useState('');
  const [itemsText, setItemsText] = useState(''); // simple input for demo
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(){
    setLoading(true);
    try {
      const items = itemsText ? JSON.parse(itemsText) : [];
      const total = items.reduce((s,i)=> s + (i.price||0)*(i.qty||1), 0);
      const order = await createOrder({ items, total });
      alert('Order created: ' + order._id);
      navigate('/payments', { replace: true, state: { orderId: order._id, amount: total }});
    } catch (err) {
      alert('Error: ' + (err.message || err));
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h3>Checkout (POC)</h3>
      <p>For this POC, paste items JSON (e.g. [{"name":"Pizza","qty":1,"price":250}])</p>
      <textarea rows={6} cols={60} value={itemsText} onChange={e=>setItemsText(e.target.value)} />
      <div>
        <input placeholder="Customer name" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <button disabled={loading} onClick={submit}>Place Order</button>
    </div>
  );
}
