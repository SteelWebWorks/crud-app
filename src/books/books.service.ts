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

  findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }

  create(book: Book): Promise<Book> {
    //book.uuid = uuid();
    return this.booksRepository.save(book);
  }

  async update(id: number, book: Book): Promise<Book> {
    await this.booksRepository.update(id, book);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async borrowBook(id: number, userId: number): Promise<Book> {
    const book = await this.findOne(id);
    if (book && book.availability) {
      book.availability = false;
      book.borrower = { id: userId } as any;
      await this.booksRepository.save(book);
    }
    return book;
  }

  async returnBook(id: number): Promise<Book> {
    const book = await this.findOne(id);
    if (book && !book.availability) {
      book.availability = true;
      book.borrower = null;
      await this.booksRepository.save(book);
    }
    return book;
  }
}
