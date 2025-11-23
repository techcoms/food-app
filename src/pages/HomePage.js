import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import FoodList from '../components/FoodList';
import Cart from '../components/Cart';

export default function HomePage(){
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  function addToCart(item){
    // add basic qty / price
    const found = cart.find(c => c.id === (item.id || item._id) && c.name === item.name);
    if (found) {
      setCart(cart.map(c => c === found ? {...c, qty: (c.qty||1) + 1} : c));
    } else {
      setCart([...cart, {...item, qty:1}]);
    }
  }

  function removeItem(idx){
    setCart(cart.filter((_,i)=>i!==idx));
  }

  return (
    <div className="container">
      <CategoryList onSelect={setSelectedCategory} />
      <FoodList categoryId={selectedCategory ? selectedCategory._id : null} addToCart={addToCart} />
      <div style={{width:280}}>
        <Cart items={cart} removeItem={removeItem} />
      </div>
    </div>
  );
}
