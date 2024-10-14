import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private boookModel: Model<BookDocument>
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.boookModel.create(createBookDto);
  }

  findAll() {
    return this.boookModel.find();
  }

  findOne(id: number) {
    return this.boookModel.findOne({id});
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return this.boookModel.findByIdAndUpdate({id}, updateBookDto);
  }

  remove(id: number) {
    return this.boookModel.findOneAndDelete({ id });
  }
}
