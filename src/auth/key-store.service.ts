import { Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class KeyStoreService {
  // private keys: { [key: string]: { privateKey: Buffer; publicKey: Buffer } } = {
  //   '1': {
  //     privateKey: fs.readFileSync(
  //       path.join(__dirname, '../../../keys/private_1.pem'),
  //     ),
  //     publicKey: fs.readFileSync(
  //       path.join(__dirname, '../../../keys/public_1.pem'),
  //     ),
  //   },
  // };

  // private currentKid = '1';

  // getCurrentPrivateKey() {
  //   return {
  //     kid: this.currentKid,
  //     privateKey: this.keys[this.currentKid].privateKey,
  //   };
  // }

  // getPublicKey(kid: string) {
  //   return this.keys[kid]?.publicKey;
  // }

  private keysDir = path.resolve(process.cwd(), 'dist/keys');

  getCurrentPrivateKey() {
    const keyMap = this.loadKeyMap();
    const kids = Object.keys(keyMap).sort();
    const currentKid = kids.at(-1)!;

    const privateKey = fs.readFileSync(
      path.join(this.keysDir, `${currentKid}.private.pem`),
    );

    return { kid: currentKid, privateKey };
  }

  getPublicKey(kid: string) {
    const publicPath = path.join(this.keysDir, `${kid}.public.pem`);

    if (!fs.existsSync(publicPath)) return null;

    return fs.readFileSync(publicPath);
  }

  private loadKeyMap() {
    const keyMapPath = path.join(this.keysDir, 'key-map.json');
    return JSON.parse(fs.readFileSync(keyMapPath, 'utf-8')) as Record<
      string,
      string
    >;
  }
}
