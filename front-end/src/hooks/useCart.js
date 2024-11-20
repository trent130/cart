import { useState, useEffect } from 'react';
import { addCartItem, fetchCartItems, updateCartItem, removeCartItem } from '../services/api';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      const response = await fetchCartItems();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const addItemToCart = async (product) => {
    try {
      await addCartItem({ ...product, quantity: 1 });
      getCartItems(); // Refresh cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const updateItemQuantity = async (id, quantity) => {
    if (quantity < 1) {
      removeItemFromCart(id);
      return;
    }
    try {
      await updateCartItem(id, { quantity });
      getCartItems(); // Refresh cart
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      await removeCartItem(id);
      getCartItems(); // Refresh cart
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return { cartItems, addItemToCart, updateItemQuantity, removeItemFromCart };
};
