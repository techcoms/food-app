import axios from 'axios';

const base = process.env.REACT_APP_API_BASE_URL || '';

export const getCategories = () =>
  axios.get(`${base}/api/categories`).then(res => res.data);
