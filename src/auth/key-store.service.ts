import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class KeyStoreService {
  private keys: { [key: string]: { privateKey: Buffer; publicKey: Buffer } } = {
    '1': {
      privateKey: fs.readFileSync(path.join(__dirname, 'keys/private_1.pem')),
      publicKey: fs.readFileSync(path.join(__dirname, 'keys/public_1.pem')),
    },
  };

  private currentKid = '1';

  getCurrentPrivateKey() {
    return {
      kid: this.currentKid,
      privateKey: this.keys[this.currentKid].privateKey,
    };
  }

  getPublicKey(kid: string) {
    return this.keys[kid]?.publicKey;
  }
}
