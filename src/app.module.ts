import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CommentsModule,
    UsersModule,
    OrdersModule,
    ItemsModule,
    ConfigModule.forRoot(),
    AuthModule.forRoot({
      connectionURI: process.env.ConnectionURI,
      apiKey: process.env.apiKey,
      appInfo: {
        appName: 'web-backend',
        apiDomain: 'https://web-backend-spk9.onrender.com',
        websiteDomain: 'https://web-backend-spk9.onrender.com',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
