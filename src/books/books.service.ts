import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { Action } from 'src/users/enum/action.enum';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(uuid: uuid): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ uuid });

    if (book === null) {
      throw new NotFoundException();
    }

    return book;
  }

  create(book: CreateBookDto): Promise<Book> {
    return this.booksRepository.save(book);
  }

  async findMany(booksUuids: string[], action: Action): Promise<Book[]> {
    const books = await this.booksRepository.find({
      where: {
        uuid: In(booksUuids),
        availability: action === Action.BORROW ? true : false,
      },
      relations: ['borrower'],
    });

    for (const book in books) {
      if (book === null) {
        return null;
      }
    }

    return books;
  }

  async update(uuid: uuid, book: UpdateBookDTO): Promise<Book> {
    await this.booksRepository.update({ uuid: uuid }, book);
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
