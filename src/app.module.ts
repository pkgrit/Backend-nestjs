import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './shared/shared.module';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { PageModule } from './ourpages/ourpages.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pratikkhanal:123@cluster0.6mzwzyy.mongodb.net/?retryWrites=true&w=majority',
    ),
    SharedModule,
    AuthModule,
    PageModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}

// login
// "name": "Test account",
//     "email": "test@test.com",
//     "password": "test@123"
