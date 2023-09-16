import { CommentService } from './comments.service';

import { Get, Controller, Body, Post, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from '@prisma/client';
import { CommentDto } from './dto/create-comment.dto';

/*import { AuthGuard } from "../auth/auth.guard";
import { Session } from "../auth/session.decorator";
import { SessionContainer } from "supertokens-node/lib/build/recipe/session/faunadb";*/

@ApiResponse({
  status: 501,
  description: 'Not implemented',
})
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({
    summary: 'Create comment',
  })
  @ApiBody({
    type: CommentDto,
  })
  @Post('create')
  async createComment(@Body() CreateCommentDto: CommentDto): Promise<Comment> {
    return await this.commentService.createComment(CreateCommentDto);
  }

  @ApiOperation({
    summary: 'Get comment',
  })
  @Get('specific/:id')
  async getComment(@Param('id') id: number): Promise<Comment> {
    return this.commentService.find(id);
  }

  @ApiOperation({
    summary: 'Delete comment',
  })
  @Delete('specific/:id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    return await this.commentService.delete(id);
  }

  @ApiOperation({
    summary: 'Get all comments',
  })
  @Get('all')
  async getAllComments(): Promise<Comment[]> {
    return this.commentService.comments();
  }
}
