import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  findAll() {
    return this.cartService.viewCart();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  findOne(@Param('id') id: string) {
    return this.cartService.viewCartItem(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(id, updateCartDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string) {
    return this.cartService.removeCartItem(id);
  }
}
