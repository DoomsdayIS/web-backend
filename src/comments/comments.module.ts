import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
  exports: [CommentService],
})
export class CommentsModule {}
