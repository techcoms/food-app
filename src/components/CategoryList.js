import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';

export default function CategoryList({ onSelect }) {
  const [cats, setCats] = useState([]);
  useEffect(() => { getCategories().then(setCats).catch(()=>setCats([])); }, []);
  return (
    <div className="sidebar">
      <h3>Categories</h3>
      {cats.map(c => (
        <div key={c._id} className="card" onClick={()=>onSelect(c)}>
          <strong>{c.name}</strong>
          <div style={{fontSize:12}}>{c.description}</div>
        </div>
      ))}
    </div>
  );
}
