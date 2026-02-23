import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { UsersService } from '../users/users.service';

import { SignupDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

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

  @Get('login')
  async login(@Body() { email, password }: LoginDto) {
    return this.usersService.login({ email, password });
  }
}
