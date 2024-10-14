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
import { EventPattern } from "@nestjs/microservices";
import { HttpService } from "@nestjs/axios";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller("book")
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly httpService: HttpService
  ) {}

  // @EventPattern("hello")
  // async hello(data:string){
  //   console.log(data);

  // }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post(":id/like")
  async likeBoss(@Param("id") id: string) {
    const book = await this.bookService.findOne(+id);
    if (!book) {
      throw new NotFoundException("Bunday book topilmadi");
    }
    book.likes++;
    await book.save();

    try {
      this.httpService
        .post(`http://localhost:3331/book/${id}/like`)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
    return book;
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookService.remove(+id);
  }
}
