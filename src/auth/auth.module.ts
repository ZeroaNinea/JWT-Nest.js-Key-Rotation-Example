import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';

import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { KeyStoreService } from './key-store.service';
import { JwtStrategy } from './jwt.strategy';
import { KeyRotationService } from './key-rotation.service';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   inject: [KeyStoreService],
    //   useFactory(keyStore: KeyStoreService) {
    //     return {
    //       // secret: configService.get('JWT_SECRET'),
    //       secret: keyStore.getCurrentPrivateKey().privateKey,
    //       signOptions: { expiresIn: '15m' },
    //     };
    //   },
    // }),
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    KeyRotationService,
    UsersService,
    PrismaService,
    AuthService,
    KeyStoreService,
    JwtStrategy,
  ],
})
export class AuthModule {}
