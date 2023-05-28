import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh') {}
