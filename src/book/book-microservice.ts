import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { HttpService } from "@nestjs/axios";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller("book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @EventPattern("hello")
  async hello(data: string) {
    console.log(data);
    return "Hello keldi(book)";
  }

  @MessagePattern("salom_book")
  async salom(data: string) {
    console.log(data);
    return "Salom keldi(book)";
  }

  @EventPattern("book_created")
  create(@Payload() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @EventPattern("book_updated")
  update(
    @Payload("id") id: string,
    @Body() updateBookDto: UpdateBookDto
  ) {
    return this.bookService.update(+updateBookDto.id, updateBookDto);
  }

  @EventPattern("book_deleted")
  remove(@Payload() id: string) {
    return this.bookService.remove(+id);
  }
}
