import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { PrismaService } from './database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule, 
    CartModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
