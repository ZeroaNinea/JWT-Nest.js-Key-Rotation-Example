import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { KeyRotationService } from './key-rotation.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { KeyStoreService } from './key-store.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
