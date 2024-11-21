import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Add to Cart (Updated for Add to Cart functionality)
  @Post('add') // Endpoint specifically for adding an item to the cart
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED) // HTTP Status 201 for item creation
  async addToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto); // Call CartService to add item
  }

  // View all cart items (filtered by userId)
  @Get(':userId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async findAll(@Param('userId') userId: string) {
    return this.cartService.viewCart(userId);  // Pass userId to view their specific cart
  }

  // View a specific cart item (filtered by userId)
  @Get(':userId/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.cartService.viewCartItem(userId, id);  // Ensure cart item belongs to the user
  }

  // Update a cart item (filtered by userId)
  @Patch(':userId/:id')
  @UsePipes(new ValidationPipe())
  async update(@Param('userId') userId: string, @Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(userId, id, updateCartDto);
  }

  // Remove a cart item (filtered by userId)
  @Delete(':userId/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('userId') userId: string, @Param('id') id: string) {
    return this.cartService.removeCartItem(userId, id);
  }

  @Patch('quantity/:id')
  async updateQuantity(
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return this.cartService.updateQuantity(id, updateCartDto.quantity);
  }
}
