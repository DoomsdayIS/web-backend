import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Order } from '@prisma/client';
import { OrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(CreateOrderDto: OrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: CreateOrderDto,
    });
  }

  async findById(id: number): Promise<Order> {
    const message = await this.prisma.order.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    } else {
      throw new NotFoundException();
    }
  }

  async findByUserId(user_id: number): Promise<Order[]> {
    const message = await this.prisma.order.findMany({
      where: {
        userId: +user_id,
      },
    });
    if (message) {
      return message;
    } else {
      throw new NotFoundException();
    }
  }
  async get_all(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }
}
