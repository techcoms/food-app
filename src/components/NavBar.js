import React from 'react';
import { Link } from 'react-router-dom';
export default function NavBar(){
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/checkout">Checkout</Link>
      <Link to="/payments">Payments</Link>
    </nav>
  );
}
