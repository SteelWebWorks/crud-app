import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enum/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(uuid: uuid): Promise<User> {
    const user = await this.userRepository.findOneBy({ uuid });

    if (user === null) {
      return null;
    }

    return user;
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });

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
}
