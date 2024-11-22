import React, { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  Snackbar,
  Alert 
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ProductList = ({ products = [], onCartUpdate }) => {
  const { user } = useAuth();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleAddToCart = async (product) => {
    if (!user) {
      setSnackbar({
        open: true,
        message: 'Please login to add items to cart',
        severity: 'warning'
      });
      return;
    }

    try {
      const result = await addToCart(product._id, 1);
      onCartUpdate(result.items);
      setSnackbar({
        open: true,
        message: 'Product added to cart successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add product to cart',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'cover',
                }}
                image={product.image}
                alt={product.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.stock}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.stock || product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList; 