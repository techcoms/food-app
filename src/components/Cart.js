import React from 'react';

export default function Cart({ items, removeItem }) {
  const total = items.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  return (
    <div style={{position:'sticky', top:10}}>
      <h3>Cart</h3>
      {items.length===0 ? <p>No items</p> :
        items.map((it, idx)=>(
          <div key={idx} className="card">
            <div>{it.name} x {it.qty || 1} — ₹{it.price}</div>
            <button onClick={() => removeItem(idx)}>Remove</button>
          </div>
        ))
      }
      <div style={{marginTop:8}}>Total: <strong>₹{total}</strong></div>
    </div>
  );
}
