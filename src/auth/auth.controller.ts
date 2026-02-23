import { Body, Controller, Post } from '@nestjs/common';

import { SignupDto } from './dto/signup.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() { email, password }: SignupDto) {
    return this.usersService.create(email, password);
  }
}
