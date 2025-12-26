import React from 'react';

export default function Cart({ items = [], removeItem = () => {} }) {
  const total = items.reduce(
    (s, i) => s + (i.price || 0) * (i.qty || 1),
    0
  );

  const formatINR = (v) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(v);

  return (
    <div style={{ position: 'sticky', top: 10 }}>
      <h3>Cart</h3>

      {items.length === 0 ? (
        <p>No items</p>
      ) : (
        items.map((it) => (
          <div key={it.id || it.name} className="card">
            <div>
              {it.name} × {it.qty || 1} — {formatINR(it.price)}
            </div>
            <button onClick={() => removeItem(it.id)}>Remove</button>
          </div>
        ))
      )}

      <div style={{ marginTop: 8 }}>
        Total: <strong>{formatINR(total)}</strong>
      </div>
    </div>
  );
}
