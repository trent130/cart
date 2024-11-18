import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], 
  providers: [DatabaseService, PrismaService],
  exports: [PrismaService],

})
export class DatabaseModule {}
