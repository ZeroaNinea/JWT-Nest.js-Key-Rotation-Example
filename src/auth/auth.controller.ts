import { Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(email: string, password: string) {
    return this.usersService.create(email, password);
  }
}
