import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order, Prisma } from '@prisma/client';
import { OrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(CreateOrderDto: OrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: CreateOrderDto,
    });
  }

  async find(id: number): Promise<Order> {
    if (!+id) throw new HttpException('Order ID is not a number!', 400);
    const message = await this.prisma.order.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Order with this ID wasnt found!');
  }

  async delete(id: number): Promise<void> {
    const message = await this.find(id);
    if (message) {
      await this.prisma.order.delete({ where: { id: +id } });
    }
  }
}
