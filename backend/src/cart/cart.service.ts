import { Controller, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../database/prisma/prisma.service'


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(createCartDto: CreateCartDto) {
    try {
      const cart = await this.prisma.cart.create({
        data: createCartDto,
      })
      if(!cart) {
        throw new NotFoundException('Error creating cart')  
      }
      return  cart;
    }catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND);
    }
  }


  async viewCart(){
    try {
      const cart = await this.prisma.cart.findMany()
      if(!cart) {
        throw new NotFoundException('Error viewing cart')
        }
        return cart;
    } catch(error) {
      throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND)
    }
  }

  async viewCartItem(id: string) {
    try {
      const cartItem = await this.prisma.cart.findUnique({
        where: { id }
      })
      if (!cartItem) {
        throw new NotFoundException('cart item not found')
      }
      return cartItem;
    } catch {
      throw new HttpException('Error viewing cart item', HttpStatus.NOT_FOUND)
    }
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto) {
    try {
      const cart = await this.prisma.cart.update({
        where: { id},
        data: updateCartDto
      })
      if (!cart) {
        throw new NotFoundException('Id specified not found')
      }
      return cart;
    } catch (error) {
       throw new HttpException(error.message, error.status || HttpStatus.NOT_FOUND)
    }
  }

  async removeCartItem(id: string){
    try {
      const cartItem = await this.prisma.cart.delete({
        where: { id }
      })
      if (!cartItem) {
        throw new NotFoundException('çart item not found')
      }
      return cartItem;
    }  catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Cart item not found');
      }
      throw new InternalServerErrorException('Error deleting cart item');
    }
  }
}
