import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCartItems = () => api.get('/cart');
export const addCartItem = (cartData) => api.post('/cart', cartData);
export const updateCartItem = (id, cartData) => api.put(`/cart/${id}`, cartData);
export const removeCartItem = (id) => api.delete(`/cart/${id}`);

export default api;
