import React, { useState, useEffect } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { fetchProducts, getCart } from './services/api';
import { useAuth } from './contexts/AuthContext';

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

function AppContent() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user } = useAuth();

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    loadProducts();
  }, []);

  // Load cart when user logs in
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        try {
          const cartData = await getCart();
          setCartItems(cartData.items || []);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      } else {
        setCartItems([]); // Clear cart when user logs out
      }
    };
    loadCart();
  }, [user]); // Reload cart when user changes

  const handleCartUpdate = async (newCartItems) => {
    setCartItems(Array.isArray(newCartItems) ? newCartItems : []);
  };

  return (
    <>
      <Navbar 
        cartItems={cartItems || []} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      <Box sx={{ my: 4 }}>
        <ProductList 
          products={products} 
          onCartUpdate={handleCartUpdate}
        />
        <Cart 
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems || []}
          onUpdateCart={handleCartUpdate}
        />
      </Box>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Container maxWidth="lg">
          <AppContent />
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 