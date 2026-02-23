import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthController } from './auth.controller';

import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '15m' },
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, PrismaService],
})
export class AuthModule {}
