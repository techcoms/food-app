import React, { useEffect, useState } from 'react';
import FoodItem from './FoodItem';
import axios from 'axios';

export default function FoodList({ categoryId, addToCart }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    // For demo, backend could expose /api/foods?categoryId=...
    const url = process.env.REACT_APP_ORDERS_URL ? `${process.env.REACT_APP_ORDERS_URL}/api/foods` : '/api/foods';
    axios.get(url, { params: { categoryId } })
      .then(res => setFoods(res.data || []))
      .catch(() => setFoods([]));
  }, [categoryId]);

  return (
    <div className="content">
      <h3>Menu</h3>
      {foods.length === 0 && <p>No items available</p>}
      {foods.map(f => <FoodItem key={f._id || f.id} food={f} addToCart={addToCart} />)}
    </div>
  );
}
