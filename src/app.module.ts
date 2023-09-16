import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [CatsModule, CommentsModule, UsersModule, OrdersModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService, PostService, PrismaService],
})
export class AppModule {}
