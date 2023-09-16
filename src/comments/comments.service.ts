import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Comment, Prisma } from '@prisma/client';
import { CommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}
  async createComment(CreateCommentDto: CommentDto): Promise<Comment> {
    return this.prisma.comment.create({
      data: CreateCommentDto,
    });
  }

  async find(id: number): Promise<Comment> {
    if (!+id) throw new HttpException('Comment ID is not a number!', 400);
    const message = await this.prisma.comment.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('Comment with this ID wasnt found!');
  }

  async delete(id: number): Promise<void> {
    const message = await this.find(id);
    if (message) {
      await this.prisma.comment.delete({ where: { id: +id } });
    }
  }

  async comments(): Promise<Comment[]> {
    return this.prisma.comment.findMany();
  }
}
