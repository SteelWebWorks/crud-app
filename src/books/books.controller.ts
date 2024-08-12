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
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { Role } from 'src/users/enum/roles.enum';

@Controller('books')
@UseGuards(JwtGuard, RolesGuard)
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
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  create(@Body(ValidationPipe) book: CreateBookDto) {
    return this.bookService.create(book);
  }

  @Patch(':uuid')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) bookUpdate: UpdateBookDTO,
  ) {
    return this.bookService.update(uuid, bookUpdate);
  }

  @Delete(':uuid')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.delete(uuid);
  }

  @Post(':uuid/borrow')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  borrowBook(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body('userId') userId: number,
  ) {
    return this.bookService.borrowBook(uuid, userId);
  }

  @Post(':uuid/return')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  returnBook(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.bookService.returnBook(uuid);
  }
}
