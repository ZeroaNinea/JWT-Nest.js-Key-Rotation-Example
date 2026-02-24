import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { KeyStoreService } from './key-store.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private keyStore: KeyStoreService,
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //   ignoreExpiration: false,
    //   secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    // });

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKeyProvider: (request, rawJwtToken: string, done) => {
        const decoded: { kid: string; email: string; sub: string } = JSON.parse(
          Buffer.from(rawJwtToken.split('.')[0], 'base64').toString(),
        ) as { kid: string; email: string; sub: string };

        const publicKey = this.keyStore.getPublicKey(decoded.kid);

        if (!publicKey) {
          return done(new Error('Invalid kid.'));
        }

        done(null, publicKey);
      },
    });
  }

  validate(payload: { sub: string; email: string }) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
