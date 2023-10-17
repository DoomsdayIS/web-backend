import { UserService } from './users.service';
import {
  Get,
  Controller,
  Body,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';
import { HttpExceptionFilter } from '../items/http-exception.filter';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'New User has been successfully created.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User wasnt created. Bad request.',
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
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'You successfully got user by id.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to do this operation.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this ID.',
  })
  @Get('byId/:id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findByID(id);
  }

  @ApiOperation({
    summary: 'Get user by email',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got user by email.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Email should be a string.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to do this operation.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this email.',
  })
  @Get('byEmail/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @ApiOperation({
    summary: 'Delete user',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'You successfully deleted user.',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to do this operation.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no user with this id.',
  })
  @Delete('byId/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.userService.delete(id);
  }
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got all users.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get all users.',
  })
  @ApiResponse({
    status: 500,
    description: 'Server isnt working right now.',
  })
  @Get('all_users')
  @UseFilters(new HttpExceptionFilter())
  async getAllItems(): Promise<User[]> {
    try {
      return this.userService.users();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
