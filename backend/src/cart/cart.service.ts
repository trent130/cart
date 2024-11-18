import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from '../database/prisma/prisma.service'

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto) {
    return this.prisma.cart.create({
      data: createCartDto,
    });
  }

  async findAll(){
    return this.prisma.cart.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cart.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return this.prisma.cart.update({
      where: { id },
      data: updateCartDto,
    });
  }

  async remove(id: string){
    return this.prisma.cart.delete({
      where: { id }
    });
  }
}
