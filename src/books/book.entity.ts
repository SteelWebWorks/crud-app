import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid', default: uuid() }) // representing the barcode
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  availability: boolean;

  @ManyToOne(() => User, (user) => user.books, { nullable: true })
  borrower: User;
}
