import { Module } from '@nestjs/common';
import { ItemController } from './items.controller';
import { ItemService } from './items.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, PrismaService],
  exports: [ItemService],
})
export class ItemsModule {}
