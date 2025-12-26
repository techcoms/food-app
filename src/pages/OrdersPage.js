import React from 'react';
import OrderList from '../components/OrderList';

export default function OrdersPage() {
  return (
    <div className="page orders-page">
      <h2>My Orders</h2>
      <OrderList />
    </div>
  );
}
