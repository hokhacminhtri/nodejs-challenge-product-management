/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createClient, RedisClientType } from 'redis';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductService implements OnModuleInit {
  private redisClient: RedisClientType;
  private cacheKeys: Set<string> = new Set();

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    this.redisClient = createClient({
      url: 'redis://127.0.0.1:6379',
    });
  }

  async onModuleInit() {
    await this.redisClient.connect();
  }

  // Retrieve all products with pagination
  async findAll(page: number, limit: number): Promise<Product[]> {
    const cacheKey = `products_${page}_${limit}`;
    const cachedProducts = await this.redisClient.get(cacheKey);

    if (cachedProducts) {
      console.log(`Cache hit for key: ${cacheKey}`);
      return JSON.parse(cachedProducts);
    } else {
      console.log(`Cache miss for key: ${cacheKey}`);
    }

    const products = await this.productRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    await this.redisClient.set(cacheKey, JSON.stringify(products), {
      EX: 300, // Cache for 5 minutes
    });
    console.log(`Cache set for key: ${cacheKey}`);
    this.cacheKeys.add(cacheKey);
    return products;
  }

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    const newProduct = await this.productRepository.save(product);
    await this.invalidateCache();
    return newProduct;
  }

  // Search products by name
  async search(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: Like(`%${query}%`) },
    });
  }

  // Like a product
  async likeProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    product.likes += 1;
    const updatedProduct = await this.productRepository.save(product);
    await this.invalidateCache();
    return updatedProduct;
  }

  // Unlike a product
  async unlikeProduct(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    product.likes -= 1;
    const updatedProduct = await this.productRepository.save(product);
    await this.invalidateCache();
    return updatedProduct;
  }

  // Invalidate cache
  private async invalidateCache() {
    for (const key of this.cacheKeys) {
      await this.redisClient.del(key);
      console.log(`Cache invalidated for key: ${key}`);
    }
    this.cacheKeys.clear();
  }
}
