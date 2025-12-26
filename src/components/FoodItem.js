import React from 'react';

export default function FoodItem({ food = {}, addToCart = () => {} }) {
  const price = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(food.price || 0);

  return (
    <div className="card">
      <h4>{food.name}</h4>
      <p>{food.description}</p>
      <div>Price: {price}</div>
      <button
        disabled={!food.price}
        onClick={() => addToCart(food)}
      >
        Add
      </button>
    </div>
  );
}
