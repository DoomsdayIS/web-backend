import { UserService } from './users.service';
import {
  Get,
  Controller,
  Body,
  Post,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';

@ApiResponse({
  status: 501,
  description: 'Not implemented',
})
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiBody({
    type: UserDto,
  })
  @Post('create')
  async createUser(@Body() CreateUserDto: UserDto): Promise<User> {
    return await this.userService.createUser(CreateUserDto);
  }

  @ApiOperation({
    summary: 'Get user by id',
  })
  @Get('byId/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findByID(id);
  }

  @ApiOperation({
    summary: 'Get user by email',
  })
  @Get('byEmail/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @Delete('byId/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.userService.delete(id);
  }

  @ApiOperation({
    summary: 'Update user info',
  })
  @Post('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() UserDto: UserDto,
  ): Promise<User> {
    return await this.userService.update(id, UserDto);
  }
}
