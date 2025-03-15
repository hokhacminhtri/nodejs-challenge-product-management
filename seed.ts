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

    // Sample product data
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
