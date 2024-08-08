import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';
import { Role } from './roles.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.BORROWER })
  role: string;

  @OneToMany(() => Book, (book) => book.borrower)
  books: Book[];
}
