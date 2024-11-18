import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [CartModule],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
