import React from 'react';

export default function Header({
  title = '🍔 Foodie — Microservices POC',
}) {
  return (
    <header className="app-header" role="banner">
      <h1>{title}</h1>
    </header>
  );
}
