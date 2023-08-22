import axios from 'axios';

const api = axios.create({
  timeout: 20000,
});

api.interceptors.response.use((res) => {
  return res.data;
}, (err) => {
  return Promise.reject(err);
});

export default api;