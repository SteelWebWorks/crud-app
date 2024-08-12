import { IsNotEmpty, IsString } from 'class-validator';

export class AuthPlayloadDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
