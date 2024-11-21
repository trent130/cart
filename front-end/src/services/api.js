// services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    if (!error.response) {
      // Network error
      console.error('Network Error - Please check if the backend server is running');
      alert('Cannot connect to server. Please check if the backend is running.');
    } else {
      // Server error
      console.error('API Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    return Promise.reject(error);
  }
);

// Add to Cart
export const addToCart = async (userId, product) => {
  try {
    const response = await api.post('/cart', {
      userId: userId.toString(),
      property_id: Number(product.id),
      quantity: 1,
      price: Number(product.price),
      name: product.name,
      description: product.description
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch Cart
export async function fetchCart(userId = '1') {
  try {
    console.log('Fetching cart for userId:', userId);
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error.response?.data || error.message);
    return []; // Return empty array on error to prevent UI crashes
  }
}

// Remove from Cart
export const removeFromCart = async (userId, cartId) => {
  try {
    await api.delete(`/${userId}/${cartId}`);
  } catch (error) {
    console.error('Error removing from cart:', error.response?.data || error.message);
    throw error;
  }
};

// Update Cart
export const updateCart = async (userId, cartId, newQuantity) => {
  try {
    if (newQuantity < 1) {
      throw new Error('Quantity cannot be less than 1');
    }
    
    const response = await api.patch(`/${userId}/${cartId}`, {
      quantity: Number(newQuantity)
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error.response?.data || error.message);
    throw error;
  }
};
