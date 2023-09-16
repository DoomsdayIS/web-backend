import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cat, Prisma } from '@prisma/client';

@Injectable()
export class CatService {
  constructor(private prisma: PrismaService) {}

  async cat(
    catWhereUniqueInput: Prisma.CatWhereUniqueInput,
  ): Promise<Cat | null> {
    return this.prisma.cat.findUnique({
      where: catWhereUniqueInput,
    });
  }
  async createCat(data: Prisma.CatCreateInput): Promise<Cat> {
    return this.prisma.cat.create({
      data,
    });
  }
}
