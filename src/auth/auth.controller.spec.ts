import { Test, TestingModule } from '@nestjs/testing';

import { KeyRotationService } from './key-rotation.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { KeyStoreService } from './key-store.service';
import { JwtStrategy } from './jwt.strategy';

import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        KeyRotationService,
        UsersService,
        PrismaService,
        AuthService,
        KeyStoreService,
        JwtStrategy,
        ConfigService,
        JwtService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
