import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/orders';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  useEffect(()=> { getOrders().then(setOrders).catch(()=>setOrders([])); }, []);
  return (
    <div>
      <h3>Orders</h3>
      {orders.map(o => (
        <div key={o._id} className="card">
          <div>Order: {o._id}</div>
          <div>Status: {o.status}</div>
          <div>Total: ₹{o.total}</div>
        </div>
      ))}
    </div>
  );
}
