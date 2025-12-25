import api from './client';

export const uploadImage = (formData) =>
  api.post('/api/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(res => res.data);

export const getImageUrl = (filename) =>
  `/api/images/${filename}`;
