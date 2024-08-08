import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Post()
  create(@Body() book: Book) {
    return this.bookService.create(book);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() bookUpdate: Book) {
    return this.bookService.update(+id, bookUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(+id);
  }

  @Post(':id/borrow')
  borrowBook(@Param('id') id: string, @Body('userId') userId: number) {
    return this.bookService.borrowBook(+id, userId);
  }

  @Post(':id/return')
  returnBook(@Param('id') id: string) {
    return this.bookService.returnBook(+id);
  }
}
