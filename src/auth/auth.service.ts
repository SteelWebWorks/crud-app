import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { AuthPlayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/users/enum/roles.enum';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: AuthPlayloadDto): Promise<string> {
    const findUser = await this.usersService.findOneByUsername(username);

    if (findUser === null) {
      return null;
    }

    if (password === findUser.password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }

    return null;
  }

  async registerUser(user: CreateUserDTO): Promise<User> {
    const { username } = user;
    const existingUser = await this.usersService.findOneByUsername(username);

    if (existingUser !== null) {
      throw new ConflictException('Username already exists');
    }

    user.role = Role.BORROWER;

    return this.usersService.create(user);
  }
}
