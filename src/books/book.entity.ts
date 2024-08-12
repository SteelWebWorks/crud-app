import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'uuid' })
  @Generated('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  availability: boolean;

  @Column({ type: 'date', nullable: true })
  borrowExpire: Date;

  @ManyToOne(() => User, (user) => user.books, { nullable: true })
  borrower: User;
}
