import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';

export default function CategoryList({ onSelect = () => {} }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCats)
      .catch(() => setCats([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="sidebar">
      <h3>Categories</h3>

      {loading && <p>Loading...</p>}

      {!loading && cats.length === 0 && (
        <p style={{ fontSize: 12 }}>No categories found</p>
      )}

      {cats.map((c) => (
        <div
          key={c._id}
          className="card"
          onClick={() => onSelect(c)}
        >
          <strong>{c.name}</strong>
          <div style={{ fontSize: 12 }}>{c.description}</div>
        </div>
      ))}
    </div>
  );
}
