import axios from 'axios';
const base = process.env.REACT_APP_ORDERS_URL || 'http://localhost:4002';
export const getOrders = () => axios.get(`${base}/api/orders`).then(r => r.data);
export const createOrder = (payload) => axios.post(`${base}/api/orders`, payload).then(r => r.data);
export const updateOrderStatus = (id, status) => axios.put(`${base}/api/orders/${id}/status`, { status }).then(r => r.data);
