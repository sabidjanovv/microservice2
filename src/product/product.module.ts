import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductMicroserviceController } from './product-microservice.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), HttpModule],
  controllers: [ProductController, ProductMicroserviceController],
  providers: [ProductService],
})
export class ProductModule {}
