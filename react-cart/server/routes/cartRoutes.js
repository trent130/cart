const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get user's cart
router.get('/', auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id })
      .populate('items.product');
    
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
      await cart.save();
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      // Create new cart if doesn't exist
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // Check if product already in cart
    const cartItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Update quantity if product exists
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      // Add new item if product doesn't exist in cart
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    
    // Populate product details before sending response
    cart = await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart item quantity
router.patch('/update/:productId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items.splice(cartItemIndex, 1);
    } else {
      // Update quantity
      cart.items[cartItemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => item.product.toString() !== req.params.productId
    );

    await cart.save();
    await cart.populate('items.product');

    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 