import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(CreateUserDto: UserDto): Promise<User> {
    return this.prisma.user.create({
      data: CreateUserDto,
    });
  }

  async findByID(id: number): Promise<User> {
    if (!+id) throw new HttpException('User ID is not a number!', 400);
    const message = await this.prisma.user.findUnique({
      where: {
        id: +id,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('User with this ID wasnt found!');
  }

  async findByEmail(email: string): Promise<User> {
    const message = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (message) {
      return message;
    }
    throw new NotFoundException('User with this email wasnt found!');
  }

  async delete(id: number): Promise<void> {
    const message = await this.findByID(id);
    if (message) {
      await this.prisma.comment.delete({ where: { id: +id } });
    }
  }

  async users(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
