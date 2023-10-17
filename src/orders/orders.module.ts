import { Module } from '@nestjs/common';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { PrismaService } from '../prisma.service';
import { ItemService } from '../items/items.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService, ItemService],
  exports: [OrderService],
})
export class OrdersModule {}
