import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { KeyRotationService } from './auth/key-rotation.service';

async function bootstrap() {
  // Rotate keys every 24 hours.
  const keyRotationService = new KeyRotationService();
  // const keyRotationService = app.get(KeyRotationService);
  keyRotationService.rotateKeys();
  setInterval(
    () => {
      keyRotationService.rotateKeys();
    },
    24 * 60 * 60 * 1000,
  );

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('PORT') ?? 3000);
}
bootstrap()
  .then(() => console.log(` 🚀 Server runs on port ${process.env.PORT}...`))
  .catch((err) => console.log(err));
