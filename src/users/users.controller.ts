import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from './enum/roles.enum';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Action } from './enum/action.enum';

@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const user = this.userService.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post(':uuid/borrow')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async borrow(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body('bookUuids') bookUuids: string[],
  ) {
    const books = await this.userService.handleBorrow(
      uuid,
      bookUuids,
      Action.BORROW,
    );

    if (books === null) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return await this.userService.findOne(uuid);
  }

  @Post(':uuid/return')
  @Roles(Role.ADMIN, Role.EMPLOYEE)
  async return(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body('bookUuids') bookUuids: string[],
  ) {
    const user = await this.userService.handleBorrow(
      uuid,
      bookUuids,
      Action.RETURN,
    );

    if (user === null) {
      throw new InternalServerErrorException('Something went wrong');
    }

    return user;
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Patch(':uuid')
  @Roles(Role.ADMIN)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.userService.update(uuid, userUpdate);
  }

  @Delete(':uuid')
  @Roles(Role.ADMIN)
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}
