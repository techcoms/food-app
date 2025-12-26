import React, { useEffect, useState } from 'react';
import FoodItem from './FoodItem';
import axios from 'axios';

export default function FoodList({ categoryId, addToCart }) {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    axios
      .get('/api/foods', { params: { categoryId } })
      .then((res) => setFoods(res.data || []))
      .catch(() => setFoods([]))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <div className="content">
      <h3>Menu</h3>

      {loading && <p>Loading...</p>}

      {!loading && foods.length === 0 && (
        <p>No items available</p>
      )}

      {foods.map((f) => (
        <FoodItem
          key={f._id || f.id}
          food={f}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
}
