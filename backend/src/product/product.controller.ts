import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Retrieve all products with pagination
  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.productService.findAll(page, limit);
  }

  // Create a new product (Authentication required)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Search products by name
  @Get('search')
  async search(@Query('q') query: string) {
    return this.productService.search(query);
  }

  // Like a product (Authentication required)
  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async likeProduct(@Param('id') id: number) {
    return this.productService.likeProduct(id);
  }

  // Unlike a product (Authentication required)
  @Post(':id/unlike')
  @UseGuards(AuthGuard('jwt'))
  async unlikeProduct(@Param('id') id: number) {
    return this.productService.unlikeProduct(id);
  }
}
