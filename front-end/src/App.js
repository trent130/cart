import React, { useState } from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import { products } from './data/products';
import { useCart } from './hooks/useCart';
import theme from './styles/theme';

function App() {
  const { cartItems, addItemToCart, removeItemFromCart, updateItemQuantity } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <Navbar cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <ProductList products={products} onAddToCart={addItemToCart} />
          <Cart
            open={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateItemQuantity}
            onRemoveFromCart={removeItemFromCart}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
