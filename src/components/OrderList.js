import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/orders';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const formatINR = (v) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(v || 0);

  return (
    <div>
      <h3>Orders</h3>

      {loading && <p>Loading...</p>}

      {!loading && orders.length === 0 && (
        <p>No orders found</p>
      )}

      {orders.map((o) => (
        <div key={o._id} className="card">
          <div>Order: {o._id}</div>
          <div>Status: {o.status}</div>
          <div>Total: {formatINR(o.total)}</div>
        </div>
      ))}
    </div>
  );
}
