import axios from 'axios';
const base = process.env.REACT_APP_IMAGES_URL || 'http://localhost:4005';
export const uploadImage = (formData) =>
  axios.post(`${base}/api/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(r => r.data);
export const getImageUrl = (filename) => `${base}/images/${filename}`;
