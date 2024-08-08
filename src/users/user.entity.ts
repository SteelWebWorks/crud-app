import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Generated,
} from 'typeorm';
import { Book } from '../books/book.entity';
import { Role } from './enum/roles.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.BORROWER })
  role: string;

  @OneToMany(() => Book, (book) => book.borrower)
  books: Book[];
}
