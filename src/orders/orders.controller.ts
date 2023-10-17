import { OrderService } from './orders.service';
import {
  Get,
  Controller,
  Body,
  Post,
  Param,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { OrderDto } from './dto/create-order.dto';
import { ItemService } from '../items/items.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly itemService: ItemService,
  ) {}

  @ApiOperation({
    summary: 'Create order',
  })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: OrderDto,
  })
  @ApiResponse({
    status: 400,
    description:
      'Order wasnt created. Bad request. Incorrect User Id or Items Id',
  })
  @ApiResponse({
    status: 401,
    description: 'You should be authorized to create a new order.',
  })
  @ApiBody({
    type: OrderDto,
  })
  @Post('create/:params')
  async createOrder(
    @Param('params') params: string,
    @Body() CreateOrderDto: OrderDto,
  ): Promise<Order> {
    try {
      const order = await this.orderService.createOrder(CreateOrderDto);
      const new_params = params.toString();
      const items = new_params.split('&');
      for (let i = 0; i < items.length; i++) {
        const x = parseInt(items[i]);
        await this.itemService.saleItem(x, order.id);
      }
      return order;
    } catch {
      throw new BadRequestException();
    }
  }

  @ApiOperation({
    summary: 'Get specific order by Id',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got a specific order.',
    type: OrderDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get a specific comment.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no order with this ID.',
  })
  @Get('specific/:id')
  async getOrder(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findById(id);
  }

  @ApiOperation({
    summary: 'Get all user orders',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got all user orders.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get all user orders.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this ID.',
  })
  @Get('user/:id')
  async getUserOrders(
    @Param('id', ParseIntPipe) user_id: number,
  ): Promise<Order[]> {
    return this.orderService.findByUserId(user_id);
  }

  @ApiOperation({
    summary: 'Get all orders',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got all orders.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get all orders.',
  })
  @Get('all')
  async getOrders(): Promise<Order[]> {
    return this.orderService.get_all();
  }
}
