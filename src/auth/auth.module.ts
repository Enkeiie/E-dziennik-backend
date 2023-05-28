import { Module } from '@nestjs/common';import {Csrf} from "ncsrf";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import {  RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RecaptchaService } from './recaptcha/recaptcha.service';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [JwtModule.register({
    secret: 'test',
    signOptions: { expiresIn: '15m' },
  }),UsersModule, ConfigModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, RecaptchaService,
    {
      provide: HttpService,
      useValue: new HttpService(),
    },]
})
export class AuthModule {}
