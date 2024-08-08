import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(uuid: uuid): Promise<Book> {
    return this.booksRepository.findOneBy({ uuid });
  }

  create(book: Book): Promise<Book> {
    return this.booksRepository.save(book);
  }

  async update(uuid: uuid, book: Book): Promise<Book> {
    await this.booksRepository.update(uuid, book);
    return this.findOne(uuid);
  }

  async delete(uuid: uuid): Promise<void> {
    await this.booksRepository.delete(uuid);
  }

  async borrowBook(uuid: uuid, userId: number): Promise<Book> {
    const book = await this.findOne(uuid);
    if (book && book.availability) {
      book.availability = false;
      book.borrower = { id: userId } as any;
      await this.booksRepository.save(book);
    }
    return book;
  }

  async returnBook(uuid: uuid): Promise<Book> {
    const book = await this.findOne(uuid);
    if (book && !book.availability) {
      book.availability = true;
      book.borrower = null;
      await this.booksRepository.save(book);
    }
    return book;
  }
}
