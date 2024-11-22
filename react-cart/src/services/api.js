const API_URL = 'http://localhost:5000/api';

// Product APIs
export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

// Cart APIs
export const addToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return response.json();
};

export const getCart = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart/remove/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};

export const updateCartItemQuantity = async (productId, quantity) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart/update/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  return response.json();
};

// Auth APIs
export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// ... rest of the existing code ... 