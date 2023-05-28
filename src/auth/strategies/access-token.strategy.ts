import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

type JwtPayload = {
    sub: string;
    username: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'test',
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: any){
        const refreshToken = req.get('Authorization').replace('Bearer','').trim();
        return { ...payload, refreshToken };
    }
}