import axios from 'axios';
const base = process.env.REACT_APP_CATEGORIES_URL || 'http://localhost:4001';
export const getCategories = () => axios.get(`${base}/api/categories`).then(r => r.data);
