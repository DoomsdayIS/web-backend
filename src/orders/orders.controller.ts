import { OrderService } from './orders.service';
import { Get, Controller, Body, Post, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from '@prisma/client';
import { OrderDto } from './dto/create-order.dto';

@ApiResponse({
  status: 501,
  description: 'Not implemented',
})
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Create order',
  })
  @ApiBody({
    type: OrderDto,
  })
  @Post('create')
  async createOrder(@Body() CreateOrderDto: OrderDto): Promise<Order> {
    return await this.orderService.createOrder(CreateOrderDto);
  }

  @ApiOperation({
    summary: 'Get order',
  })
  @Get(':id')
  async getOrder(@Param('id') id: number): Promise<Order> {
    return this.orderService.find(id);
  }

  @ApiOperation({
    summary: 'Delete order',
  })
  @Delete(':id')
  async deleteOrder(@Param('id') id: number): Promise<void> {
    return await this.orderService.delete(id);
  }
}
