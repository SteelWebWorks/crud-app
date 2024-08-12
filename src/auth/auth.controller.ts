import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  register(@Body() user: CreateUserDTO): Promise<User> {
    return this.authService.registerUser(user);
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    console.log(req.user);
  }
}
