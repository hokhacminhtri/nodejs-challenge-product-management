import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Product } from './product/product.entity';
import { ProductModule } from './product/product.module';

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
    ProductModule,
    CacheModule.register({
      store: redisStore,
      host: '127.0.0.1',
      port: 6379,
      db: 0,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    try {
      await this.cacheManager.set('test_key', 'test_value', 10);
      const value = await this.cacheManager.get('test_key');
      if (value === 'test_value') {
        console.log('Redis connection successful');
      } else {
        console.log('Redis connection failed');
      }
    } catch (error) {
      console.error('Error connecting to Redis:', error);
    }
  }
}
