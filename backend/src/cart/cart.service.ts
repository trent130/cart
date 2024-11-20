import { Injectable, HttpException, HttpStatus, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Create a new cart item or update the quantity if it already exists
  async createCart(createCartDto: CreateCartDto) {
    try {
      // Check if the cart already contains this product for the same user
      const existingCartItem = await this.prisma.cart.findFirst({
        where: {
          property_id: createCartDto.property_id,
          userId: createCartDto.userId, // assuming a userId is being sent
        },
      });

      // If the product already exists in the cart, just update the quantity
      if (existingCartItem) {
        return await this.prisma.cart.update({
          where: { id: existingCartItem.id },
          data: {
            quantity: existingCartItem.quantity + createCartDto.quantity,
          },
        });
      }

      // If not, create a new cart item
      const cart = await this.prisma.cart.create({
        data: createCartDto,
      });

      return cart;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // View all items in a user's cart
  async viewCart(userId: string) {
    try {
      const cart = await this.prisma.cart.findMany({
        where: { userId },
      });

      if (!cart || cart.length === 0) {
        throw new NotFoundException('Cart is empty or not found');
      }
      return cart;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }

  // View a specific cart item by ID
  async viewCartItem(userId: string, id: string) {
    try {
      const cartItem = await this.prisma.cart.findFirst({
        where: { id, userId }, // Ensure the cart item belongs to the specific user
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      return cartItem;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Update the quantity of a cart item
  async updateCart(userId: string, id: string, updateCartDto: UpdateCartDto) {
    try {
      // Ensure the cart item belongs to the user
      const cartItem = await this.prisma.cart.findFirst({
        where: { id, userId },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      if (updateCartDto.quantity < 1) {
        return await this.removeCartItem(userId, id);  // If quantity is 0 or less, remove the item
      }

      return await this.prisma.cart.update({
        where: { id },
        data: updateCartDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  // Remove a cart item
  async removeCartItem(userId: string, id: string) {
    try {
      // Ensure the cart item belongs to the user
      const cartItem = await this.prisma.cart.findFirst({
        where: { id, userId },
      });

      if (!cartItem) {
        throw new NotFoundException('Cart item not found');
      }

      return await this.prisma.cart.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Cart item not found');
      }
      throw new InternalServerErrorException('Error deleting cart item');
    }
  }
}
