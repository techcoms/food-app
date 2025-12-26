import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import FoodList from '../components/FoodList';
import Cart from '../components/Cart';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(prev => {
      const id = item.id || item._id;
      const found = prev.find(c => (c.id || c._id) === id);

      if (found) {
        return prev.map(c =>
          (c.id || c._id) === id
            ? { ...c, qty: (c.qty || 1) + 1 }
            : c
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  }

  function removeItem(id) {
    setCart(prev => prev.filter(c => (c.id || c._id) !== id));
  }

  return (
    <div className="container">
      <CategoryList onSelect={setSelectedCategory} />

      <FoodList
        categoryId={selectedCategory?._id}
        addToCart={addToCart}
      />

      <div style={{ width: 280 }}>
        <Cart items={cart} removeItem={removeItem} />
      </div>
    </div>
  );
}
