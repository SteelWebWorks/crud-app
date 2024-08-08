import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateBookDTO } from 'src/books/dto/update-book.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(uuid: uuid): Promise<User> {
    return this.userRepository.findOneBy({ uuid });
  }

  create(user: CreateUserDTO): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(uuid: uuid, user: UpdateBookDTO): Promise<User> {
    await this.userRepository.update(uuid, user);
    return this.findOne(uuid);
  }

  async delete(uuid: uuid): Promise<void> {
    await this.userRepository.delete(uuid);
  }
}
