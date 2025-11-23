import React from 'react';

export default function FoodItem({ food, addToCart }) {
  return (
    <div className="card">
      <h4>{food.name}</h4>
      <p>{food.description}</p>
      <div>Price: ₹{food.price}</div>
      <button onClick={() => addToCart(food)}>Add</button>
    </div>
  );
}
