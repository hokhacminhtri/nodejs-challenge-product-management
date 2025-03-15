import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1', // Use localhost when app runs on host machine
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'productdb',
      entities: [Product],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    AuthModule,
    CacheModule.register({
      store: redisStore,
      host: 'redis',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
