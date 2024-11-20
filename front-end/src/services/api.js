// services/api.js
const API_URL = 'http://127.0.0.1:3000/cart'; // Backend base URL

// Add to Cart (POST request)
export const addToCart = async (userId, product) => {
  try {
    const response = await fetch(`${API_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,  // Static userId for testing
        productId: product.id,
        quantity: 1, // Assuming default quantity is 1
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Fetch Cart items (GET request)
export const fetchCart = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

// Remove item from Cart (DELETE request)
export const removeFromCart = async (userId, productId) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove item');
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Update Cart item (PATCH request)
export const updateCart = async (userId, productId, newQuantity) => {
  try {
    const response = await fetch(`${API_URL}/${userId}/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};
