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
  const userId = "ef5ea50d-a3e0-453a-92b0-f2bb2fa0eeeb";  // Hardcoded userId for testing
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
    const newCartItem = await addToCart(userId, product);
    setCartItems((prevItems) => [...prevItems, newCartItem]);
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
