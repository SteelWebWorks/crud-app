import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  findAll(@Query('status') availability?: boolean) {
    return this.bookService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.findOne(uuid);
  }

  @Post()
  create(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.create(book);
  }

  @Patch(':uuid')
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) bookUpdate: UpdateBookDTO,
  ) {
    return this.bookService.update(uuid, bookUpdate);
  }

  @Delete(':uuid')
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.delete(uuid);
  }

  @Post(':uuid/borrow')
  borrowBook(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body('userId') userId: number,
  ) {
    return this.bookService.borrowBook(uuid, userId);
  }

  @Post(':uuid/return')
  returnBook(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.returnBook(uuid);
  }
}
