import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enum/roles.enum';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly bookService: BooksService,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(uuid: uuid): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: ['books'],
    });

    if (user === null) {
      return null;
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['books'],
    });

    if (user === null) {
      return null;
    }

    return user;
  }

  async create(user: CreateUserDTO): Promise<User> {
    const salt = await bcryptjs.genSalt();
    const passwordHash = await bcryptjs.hash(user.password, salt);

    const newUser = this.userRepository.create({
      ...user,
      password: passwordHash,
      role: Role.BORROWER,
    });
    return this.userRepository.save(newUser);
  }

  async update(uuid: uuid, user: UpdateUserDto): Promise<User> {
    if (user.password) {
      const salt = await bcryptjs.genSalt();
      user.password = await bcryptjs.hash(user.password, salt);
    }
    await this.userRepository.update(uuid, user);
    return this.findOne(uuid);
  }

  async delete(uuid: uuid): Promise<void> {
    await this.userRepository.delete(uuid);
  }

  async borrowBooks(uuid: uuid, booksUuids): Promise<User> {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        uuid: true,
      },
      where: {
        uuid,
      },
      relations: ['books'],
    });

    if (user === null) {
      return null;
    }

    const books = await this.bookService.findMany(booksUuids);

    if (books === null) {
      return null;
    }

    user.books = books;

    await this.userRepository.save(user);
  }
}
