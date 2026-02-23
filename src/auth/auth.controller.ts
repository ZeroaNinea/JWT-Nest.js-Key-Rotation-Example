import { Body, Controller, Post } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() { email, password }: SignupDto) {
    return this.usersService.create({ email, password });
  }

  @Post('update')
  async update(@Body() { id, email, password }: UpdateDto) {
    return this.usersService.update({ id, email, password });
  }

  @Post('delete')
  async delete(@Body() { id, password }: DeleteDto) {
    return this.usersService.delete({ id, password });
  }
}
