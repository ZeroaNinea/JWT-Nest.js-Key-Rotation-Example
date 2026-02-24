import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

import { SignupDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() { email, password }: SignupDto) {
    return this.usersService.create({ email, password });
  }

  @Put('update')
  async update(@Body() { id, email, password }: UpdateDto) {
    return this.usersService.update({ id, email, password });
  }

  @Delete('delete')
  async delete(@Body() { id, password }: DeleteDto) {
    return this.usersService.delete({ id, password });
  }

  @Post('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.authService.login({ email, password });
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(
    @Request()
    req: {
      user: {
        id: string;
        email: string;
      };
    },
  ) {
    return req.user;
  }
}
