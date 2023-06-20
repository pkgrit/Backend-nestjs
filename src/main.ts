import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(passport.initialize());
  // passport.use(new JwtStrategy());
  await app.listen(3000);
}
bootstrap();

// nest g module user
// nest g controller user
// nest g s user
