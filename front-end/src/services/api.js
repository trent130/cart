// services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/cart';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add to Cart
export const addToCart = async (userId, product) => {
  try {
    const response = await api.post('', {
      userId: userId.toString(),
      property_id: parseInt(product.id),
      quantity: 1,
      price: product.price.toString()
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error.message);
    throw error;
  }
};

// Fetch Cart
export async function fetchCart() {
  try {
    const response = await api.get('/ef5ea50d-a3e0-453a-92b0-f2bb2fa0eeeb');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error.response?.data || error.message);
    throw error;
  }
}

// Remove from Cart
export const removeFromCart = async (cartId) => {
  try {
    await api.delete(`/${cartId}`);
  } catch (error) {
    console.error('Error removing from cart:', error.response?.data || error.message);
    throw error;
  }
};

// Update Cart
export const updateCart = async (cartId, newQuantity) => {
  try {
    const response = await api.patch(`/${cartId}`, {
      quantity: parseInt(newQuantity)
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error.response?.data || error.message);
    throw error;
  }
};
