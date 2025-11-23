import axios from 'axios';
const base = process.env.REACT_APP_PAYMENTS_URL || 'http://localhost:4003';
export const charge = (payload) => axios.post(`${base}/api/payments/charge`, payload).then(r => r.data);
export const getPayments = () => axios.get(`${base}/api/payments`).then(r => r.data);
