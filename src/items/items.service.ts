import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Item, Prisma } from '@prisma/client';
import { ItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  async createItem(CreateItemDto: ItemDto): Promise<Item> {
    return this.prisma.item.create({
      data: CreateItemDto,
    });
  }

  async find(id: number): Promise<Item> {
    if (!+id) throw new HttpException('Comment ID is not a number!', 400);
    const message = await this.prisma.item.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Comment with this ID wasnt found!');
  }

  async delete(id: number): Promise<void> {
    const message = await this.find(id);
    if (message) {
      await this.prisma.item.delete({ where: { id: +id } });
    }
  }
}
