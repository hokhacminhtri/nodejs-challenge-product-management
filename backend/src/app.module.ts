/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT || '3306', 10),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Product],
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 3000,
    }),
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private redisClient;

  constructor() {
    this.redisClient = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });
  }

  async onModuleInit() {
    try {
      await this.redisClient.connect();
      await this.redisClient.set('test_key', 'test_value', {
        EX: 10, // Set TTL to 10 seconds
      });
      const value = await this.redisClient.get('test_key');
      if (value === 'test_value') {
        console.log('Redis connection successful', value);
      } else {
        console.log('Redis connection failed');
      }
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    } finally {
      await this.redisClient.disconnect();
    }
  }
}
