import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [UsersService, PrismaService],
})
export class AuthModule {}
