import React from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, Box, Button, Divider, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { updateCart, removeFromCart } from '../services/api';

const Cart = ({ open, onClose, cartItems, onUpdateQuantity, onRemoveFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        return; // Don't allow quantities less than 1
      }
      await updateCart('1', cartId, newQuantity); // Add userId
      onUpdateQuantity(cartId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart('1', cartId);
      onRemoveFromCart(cartId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 350, p: 2 }}>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Shopping Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
                <ButtonGroup size="small" sx={{ ml: 2 }}>
                  <Button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button disabled>{item.quantity}</Button>
                  <Button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Total: ${total.toFixed(2)}
          </Typography>
          <Button variant="contained" color="primary" fullWidth disabled={cartItems.length === 0}>
            Checkout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Cart;
