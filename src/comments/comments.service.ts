import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Comment } from '@prisma/client';
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

  async comments(
    cnt: number = 0,
    get_all: boolean = false,
  ): Promise<Comment[]> {
    if (get_all) {
      return this.prisma.comment.findMany();
    }
    return this.prisma.comment.findMany({ take: -cnt });
  }
}
