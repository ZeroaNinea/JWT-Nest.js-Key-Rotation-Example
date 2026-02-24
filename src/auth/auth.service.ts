import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { KeyStoreService } from './key-store.service';

@Injectable()
export class AuthService {
  private kid: string;
  private privateKey: Buffer;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private keyStore: KeyStoreService,
  ) {
    const { kid, privateKey } = this.keyStore.getCurrentPrivateKey();
    this.kid = kid;
    this.privateKey = privateKey;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.validateUser(dto);

    if (!user) {
      throw new UnauthorizedException(' X_X Invalid credentials.');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        privateKey: this.privateKey,
        algorithm: 'RS256',
        header: {
          alg: 'RS256',
          kid: this.kid,
        },
        expiresIn: '15m',
      }),
    };
  }
}
