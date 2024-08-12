import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsNotEmpty()
  availabilty: boolean;

  @IsNumber()
  borrower: User;
}
