import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enum/roles.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Valid role required',
  })
  role: Role;
}
