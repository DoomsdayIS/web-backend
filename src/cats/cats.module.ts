import { Module } from '@nestjs/common';
import { CatController } from './cats.controller';
import { CatService } from './cats.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CatController],
  providers: [CatService, PrismaService],
  exports: [CatService],
})
export class CatsModule {}
