import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/backend2"), ProductModule, BookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
