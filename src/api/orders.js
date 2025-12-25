import api from './client';

export const getOrders = () =>
  api.get('/api/orders').then(res => res.data);

export const createOrder = (payload) =>
  api.post('/api/orders', payload).then(res => res.data);

export const updateOrderStatus = (id, status) =>
  api.put(`/api/orders/${id}/status`, { status }).then(res => res.data);
