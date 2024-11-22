import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Badge,
  Button,
  Box
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ cartItems = [], onCartClick }) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAuthClick = () => {
    if (user) {
      logout();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechShop
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {user && (
              <Typography variant="body1">
                Welcome, {user.name}
              </Typography>
            )}
            
            <Button 
              color="inherit"
              onClick={handleAuthClick}
            >
              {user ? 'Logout' : 'Login'}
            </Button>

            <IconButton 
              color="inherit" 
              onClick={onCartClick}
              aria-label="cart"
            >
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <AuthModal 
        open={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar; 