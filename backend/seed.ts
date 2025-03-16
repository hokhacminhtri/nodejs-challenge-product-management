import { NestFactory } from '@nestjs/core';
import { Connection } from 'typeorm';
import { AppModule } from './src/app.module';
import { Product } from './src/product/product.entity';

async function bootstrap() {
  try {
    // Create an application context instead of an HTTP server
    const app = await NestFactory.createApplicationContext(AppModule);

    // Retrieve the established connection from the Nest context
    const connection = app.get(Connection);

    const productRepository = connection.getRepository(Product);

    // Sample product data (25 entries)
    const products = [
      {
        name: 'Phone',
        price: 500,
        category: 'Electronics',
        subcategory: 'Gadgets',
        likes: 0,
      },
      {
        name: 'Dune',
        price: 50,
        category: 'Books',
        subcategory: 'Novel',
        likes: 0,
      },
      {
        name: 'Shirt',
        price: 100,
        category: 'Clothing',
        subcategory: 'Men',
        likes: 0,
      },
      {
        name: 'Laptop',
        price: 1200,
        category: 'Electronics',
        subcategory: 'Computers',
        likes: 0,
      },
      {
        name: 'Headphones',
        price: 150,
        category: 'Electronics',
        subcategory: 'Audio',
        likes: 0,
      },
      {
        name: 'Coffee Maker',
        price: 80,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        likes: 0,
      },
      {
        name: 'Sneakers',
        price: 90,
        category: 'Footwear',
        subcategory: 'Sports',
        likes: 0,
      },
      {
        name: 'Wrist Watch',
        price: 200,
        category: 'Accessories',
        subcategory: 'Watches',
        likes: 0,
      },
      {
        name: 'Backpack',
        price: 60,
        category: 'Accessories',
        subcategory: 'Bags',
        likes: 0,
      },
      {
        name: 'Sunglasses',
        price: 120,
        category: 'Accessories',
        subcategory: 'Eyewear',
        likes: 0,
      },
      {
        name: 'Tablet',
        price: 350,
        category: 'Electronics',
        subcategory: 'Gadgets',
        likes: 0,
      },
      {
        name: 'Bluetooth Speaker',
        price: 110,
        category: 'Electronics',
        subcategory: 'Audio',
        likes: 0,
      },
      {
        name: 'Microwave Oven',
        price: 250,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        likes: 0,
      },
      {
        name: 'Refrigerator',
        price: 800,
        category: 'Home Appliances',
        subcategory: 'Kitchen',
        likes: 0,
      },
      {
        name: 'Novelty Mug',
        price: 20,
        category: 'Home & Garden',
        subcategory: 'Kitchenware',
        likes: 0,
      },
      {
        name: 'Desk Lamp',
        price: 40,
        category: 'Home & Garden',
        subcategory: 'Lighting',
        likes: 0,
      },
      {
        name: 'Gaming Console',
        price: 400,
        category: 'Electronics',
        subcategory: 'Gaming',
        likes: 0,
      },
      {
        name: 'Action Figure',
        price: 30,
        category: 'Toys',
        subcategory: 'Collectibles',
        likes: 0,
      },
      {
        name: 'Board Game',
        price: 45,
        category: 'Toys',
        subcategory: 'Games',
        likes: 0,
      },
      {
        name: 'Running Shorts',
        price: 35,
        category: 'Clothing',
        subcategory: 'Sportswear',
        likes: 0,
      },
      {
        name: 'Yoga Mat',
        price: 25,
        category: 'Sports',
        subcategory: 'Fitness',
        likes: 0,
      },
      {
        name: 'Cookbook',
        price: 30,
        category: 'Books',
        subcategory: 'Cooking',
        likes: 0,
      },
      {
        name: 'Digital Camera',
        price: 600,
        category: 'Electronics',
        subcategory: 'Photography',
        likes: 0,
      },
      {
        name: 'Perfume',
        price: 70,
        category: 'Beauty',
        subcategory: 'Fragrances',
        likes: 0,
      },
      {
        name: 'Jeans',
        price: 80,
        category: 'Clothing',
        subcategory: 'Men',
        likes: 0,
      },
    ];

    for (const p of products) {
      const product = productRepository.create(p);
      await productRepository.save(product);
      console.log(`Inserted product: ${product.name}`);
    }

    await app.close();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

bootstrap();
