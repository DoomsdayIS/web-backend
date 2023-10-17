import { ItemService } from './items.service';
import {
  Get,
  Controller,
  Body,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  BadRequestException,
  Put,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Item } from '@prisma/client';
import { ItemDto } from './dto/create-item.dto';
import { HttpExceptionFilter } from './http-exception.filter';

@ApiTags('Items')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({
    summary: 'Create item',
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
    type: ItemDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Comments wasnt created. Bad request.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to create an item.',
  })
  @ApiBody({
    type: ItemDto,
  })
  @Post('create')
  @UseFilters(new HttpExceptionFilter())
  async createComment(@Body() CreateItemDto: ItemDto): Promise<Item> {
    try {
      return await this.itemService.createItem(CreateItemDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @ApiOperation({
    summary: 'Get item',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'You successfully got a specific item.',
    type: ItemDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Item id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get a specific item.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no item with this ID.',
  })
  @Get('specific/:id')
  async getItem(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.itemService.find(id);
  }

  @ApiOperation({
    summary: 'Delete item',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Item was successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Item Id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to delete a specific item.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no item with this ID.',
  })
  @Delete('specific/:id')
  async deleteItem(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.itemService.delete(id);
  }
  @ApiOperation({
    summary: 'Get all items',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got all items.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get all items.',
  })
  @Get('all_items')
  @UseFilters(new HttpExceptionFilter())
  async getAllItems(): Promise<Item[]> {
    try {
      return this.itemService.items(0, true);
    } catch {
      throw new BadRequestException();
    }
  }
  @ApiOperation({
    summary: 'Get N latest items',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got N latest items.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server problems.',
  })
  @Get('items/:amount')
  async getItems(
    @Param('amount', ParseIntPipe) amount: number,
  ): Promise<Item[]> {
    return this.itemService.items(amount);
  }
  @ApiOperation({
    summary: 'Get not sold photos',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got photos.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server problems.',
  })
  @Get('photos')
  @UseFilters(new HttpExceptionFilter())
  async getPhotos(): Promise<Item[]> {
    try {
      return this.itemService.photos_for_sale(0, true);
    } catch {
      throw new InternalServerErrorException('Server doesnt work!');
    }
  }
  @ApiOperation({
    summary: 'Get not sold pictures',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got pictures.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server problems.',
  })
  @Get('pictures')
  @UseFilters(new HttpExceptionFilter())
  async getPictures(): Promise<Item[]> {
    try {
      return this.itemService.pics_for_sale(0, true);
    } catch {
      throw new InternalServerErrorException('Server doesnt work!');
    }
  }
  @ApiOperation({
    summary: 'Update item by id',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully update info about item.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Incorrect id or orderId',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to update item.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no item with this ID.',
  })
  @Put('update/:id')
  @UseFilters(new HttpExceptionFilter())
  async updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() CreateItemDto: ItemDto,
  ): Promise<Item> {
    try {
      return await this.itemService.updateItem(id, CreateItemDto);
    } catch {
      throw new BadRequestException();
    }
  }
}
