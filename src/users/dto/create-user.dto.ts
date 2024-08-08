import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enum/roles.enum';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Role, {
    message: 'Valid role required',
  })
  role: Role;
}
