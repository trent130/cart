import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from './database/prisma/prisma.service';

@Module({
  imports: [DatabaseModule, CartModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
