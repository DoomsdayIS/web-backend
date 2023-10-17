import { CommentService } from './comments.service';
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
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import { CommentDto } from './dto/create-comment.dto';
import { HttpExceptionFilter } from './http-exception.filter';

@ApiTags('Comments')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'Create comment',
  })
  @ApiResponse({
    status: 201,
    description: 'The comment has been successfully created.',
    type: CommentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Comments wasnt created. Bad request.',
  })
  @ApiResponse({
    status: 401,
    description: 'You should be authorized to create a new comment.',
  })
  @ApiBody({
    type: CommentDto,
  })
  @Post('create')
  @UseFilters(new HttpExceptionFilter())
  async createComment(@Body() CreateCommentDto: CommentDto): Promise<Comment> {
    try {
      return await this.commentService.createComment(CreateCommentDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @ApiOperation({
    summary: 'Get specific comment',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'You successfully got a specific comment.',
    type: CommentDto,
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
    description: 'There is no comment with this ID.',
  })
  @Get('specific/:id')
  async getComment(@Param('id', ParseIntPipe) id: number): Promise<Comment> {
    return this.commentService.find(id);
  }

  @ApiOperation({
    summary: 'Delete comment',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Comment was successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Id should be an integer.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to delete a specific comment.',
  })
  @ApiResponse({
    status: 404,
    description: 'There is no comment with this ID.',
  })
  @Delete('specific/:id')
  async deleteComment(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.commentService.delete(id);
  }

  @ApiOperation({
    summary: 'Get latest 10 comments',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got 10 latest comments.',
  })
  @Get('latest')
  async getLastComments(): Promise<Comment[]> {
    return this.commentService.comments(10);
  }

  @ApiOperation({
    summary: 'Get all comments',
  })
  @ApiResponse({
    status: 200,
    description: 'You successfully got all comments.',
  })
  @ApiResponse({
    status: 403,
    description: 'You have no permission to get all comments.',
  })
  @Get('all')
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.comments(0, true);
  }
}
