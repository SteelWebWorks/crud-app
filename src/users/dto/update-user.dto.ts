import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateBookDto) {}
