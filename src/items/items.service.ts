import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Item } from '@prisma/client';
import { ItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  async createItem(CreateItemDto: ItemDto): Promise<Item> {
    CreateItemDto.orderId = null;
    const items = await this.prisma.item.findMany();
    CreateItemDto.id = items.length + 100;
    return this.prisma.item.create({
      data: CreateItemDto,
    });
  }

  async find(id: number): Promise<Item> {
    const message = await this.prisma.item.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Item with this ID wasnt found!');
  }

  async delete(id: number): Promise<void> {
    const message = await this.find(id);
    if (message) {
      await this.prisma.item.delete({ where: { id: +id } });
    }
  }

  async items(cnt: number = 0, get_all: boolean = false): Promise<Item[]> {
    if (get_all) {
      return this.prisma.item.findMany();
    }
    return this.prisma.item.findMany({ take: -cnt });
  }

  async photos_for_sale(
    cnt: number = 0,
    get_all: boolean = false,
  ): Promise<Item[]> {
    if (get_all) {
      return this.prisma.item.findMany({
        where: { type: 'photo', sold: false },
      });
    }
    return this.prisma.item.findMany({
      take: -cnt,
      where: { type: 'photo', sold: false },
    });
  }

  async pics_for_sale(
    cnt: number = 0,
    get_all: boolean = false,
  ): Promise<Item[]> {
    if (get_all) {
      return this.prisma.item.findMany({
        where: { type: 'picture', sold: false },
      });
    }
    return this.prisma.item.findMany({
      take: -cnt,
      where: { type: 'picture', sold: false },
    });
  }
  async updateItem(id: number, CreateItemDto: ItemDto): Promise<Item> {
    if (CreateItemDto.orderId == 0) {
      CreateItemDto.orderId = null;
    }
    return this.prisma.item.update({
      where: {
        id: +id,
      },
      data: CreateItemDto,
    });
  }

  async saleItem(id: number, order_id: number): Promise<Item> {
    let item = await this.find(id);
    item.sold = true;
    item.orderId = order_id;
    item = await this.updateItem(id, item);
    return item;
  }
}
