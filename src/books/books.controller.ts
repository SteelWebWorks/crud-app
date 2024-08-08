import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  findAll(@Query('status') status?: 'AVAILABLE' | 'NOT_AVAILABE') {
    return this.bookService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.findOne(uuid);
  }

  @Post()
  create(@Body() book: Book) {
    return this.bookService.create(book);
  }

  @Patch(':uuid')
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() bookUpdate: Book) {
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
