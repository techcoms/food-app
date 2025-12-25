import api from './client';

export const charge = (payload) =>
  api.post('/api/payments/charge', payload).then(res => res.data);

export const getPayments = () =>
  api.get('/api/payments').then(res => res.data);
