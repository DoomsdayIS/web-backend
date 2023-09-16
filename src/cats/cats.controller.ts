import { CatService } from './cats.service';
//import { Cat } from './interfaces/cat.interface';

import {
  Get,
  Controller,
  Render,
  UseInterceptors,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { LoadTimeInterceptor } from '../loadtime.interceptor';
import { Cat as CatModel } from '@prisma/client';

@Controller('cat')
@UseInterceptors(LoadTimeInterceptor)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get('/:id')
  @Render('pages/cats')
  async getCatById(@Param('id') id: string): Promise<CatModel> {
    return this.catService.cat({ id: Number(id) });
  }

  @Post('/create')
  async createDraft(
    @Body() catData: { name: string; age: number; breed: string },
  ): Promise<CatModel> {
    const { name, age, breed } = catData;
    return this.catService.createCat({
      name,
      age,
      breed,
    });
  }
}
