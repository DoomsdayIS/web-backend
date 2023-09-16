import { ItemService } from './items.service';
import { Get, Controller, Body, Post, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { ItemDto } from './dto/create-item.dto';

@ApiResponse({
  status: 501,
  description: 'Not implemented',
})
@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    summary: 'Create item',
  })
  @ApiBody({
    type: ItemDto,
  })
  @Post('create')
  async createComment(@Body() CreateItemDto: ItemDto): Promise<Item> {
    return await this.itemService.createItem(CreateItemDto);
  }

  @ApiOperation({
    summary: 'Get item',
  })
  @Get('specific/:id')
  async getItem(@Param('id') id: number): Promise<Item> {
    return this.itemService.find(id);
  }

  @ApiOperation({
    summary: 'Delete item',
  })
  @Delete('specific/:id')
  async deleteItem(@Param('id') id: number): Promise<void> {
    return await this.itemService.delete(id);
  }
}
