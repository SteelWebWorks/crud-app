import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Book } from 'src/books/book.entity';
import { BooksService } from 'src/books/books.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Book])],
  controllers: [UsersController],
  providers: [UsersService, BooksService],
})
export class UsersModule {}
