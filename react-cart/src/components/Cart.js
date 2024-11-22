import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Box,
  Button,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../contexts/AuthContext';
import { removeFromCart } from '../services/api';

const Cart = ({ open, onClose, items = [], onUpdateCart }) => {
  const { user } = useAuth();

  // Ensure items is always an array
  const cartItems = Array.isArray(items) ? items : [];

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item?.product?.price || 0;
    const quantity = item?.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  const handleCheckout = () => {
    // Implement checkout logic
    console.log('Proceeding to checkout...');
  };

  const handleRemoveItem = async (productId) => {
    try {
      const result = await removeFromCart(productId);
      onUpdateCart(result.items || []);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  if (!user) {
    return (
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6">Shopping Cart</Typography>
          <Typography sx={{ mt: 2 }}>
            Please login to view your cart
          </Typography>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Shopping Cart
        </Typography>
        
        {cartItems.length === 0 ? (
          <Typography>Your cart is empty</Typography>
        ) : (
          <>
            <List>
              {cartItems.map((item) => (
                <ListItem
                  key={item?.product?._id || Math.random()}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleRemoveItem(item?.product?._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item?.product?.name || 'Unknown Product'}
                    secondary={`Quantity: ${item?.quantity || 0} - $${((item?.product?.price || 0) * (item?.quantity || 0)).toFixed(2)}`}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Total: ${totalAmount.toFixed(2)}
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{ mt: 2 }}
            >
              Checkout
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Cart; 