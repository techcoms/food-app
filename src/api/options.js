import api from './client';

export const getOptions = () =>
  api.get('/api/options').then(res => res.data);
