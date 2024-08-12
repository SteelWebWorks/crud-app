import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';
import { Role } from './enum/roles.enum';
import { Roles } from 'src/auth/guards/roles/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

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
  @Roles(Role.ADMIN, Role.EMPLOYEE, Role.BORROWER)
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    const user = this.userService.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return;
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body(ValidationPipe) user: CreateUserDTO) {
    return this.userService.create(user);
  }

  @Patch(':uuid')
  @Roles(Role.ADMIN)
  update(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body(ValidationPipe) userUpdate: UpdateUserDto,
  ) {
    return this.userService.update(uuid, userUpdate);
  }

  @Delete(':uuid')
  @Roles(Role.ADMIN)
  delete(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}
