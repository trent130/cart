import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { products } from './data/products';
import { addToCart, fetchCart, removeFromCart, updateCart } from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const userId = "1";  // Hardcoded userId for testing
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  // Fetch cart items for the user
  const fetchCartItems = async () => {
    const data = await fetchCart(userId);
    setCartItems(data);
  };

  // Add item to cart
  const handleAddToCart = async (product) => {
    try {
      console.log('Adding product to cart:', product);
      const newCartItem = await addToCart(userId, product);
      console.log('Response from server:', newCartItem);
      
      // Only update cart if the API call was successful
      if (newCartItem) {
        setCartItems((prevItems) => {
          // Check if item already exists in cart
          const existingItem = prevItems.find(item => item.property_id === product.id);
          if (existingItem) {
            // Update quantity if item exists
            return prevItems.map(item =>
              item.property_id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          // Add new item if it doesn't exist
          return [...prevItems, newCartItem];
        });
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
      // Add user feedback here
      alert('Failed to add item to cart. Please try again.');
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    await removeFromCart(userId, productId);
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  // Update cart item quantity
  const handleUpdateQuantity = async (productId, newQuantity) => {
    await updateCart(userId, productId, newQuantity);
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar
          cartItems={cartItems}
          onCartClick={() => setIsCartOpen(true)}
        />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
          <Cart
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
