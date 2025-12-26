import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentsPage from './pages/PaymentsPage';

function App() {
  return (
    <div>
      <Header />
      <NavBar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
