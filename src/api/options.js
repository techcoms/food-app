import axios from 'axios';
const base = process.env.REACT_APP_OPTIONS_URL || 'http://localhost:4004';
export const getOptions = () => axios.get(`${base}/api/options`).then(r => r.data);
