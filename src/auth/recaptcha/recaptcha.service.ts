import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';import {Csrf} from "ncsrf";

@Injectable()
export class RecaptchaService {
    constructor( private readonly httpService: HttpService){}

    async validate(token:string): Promise<boolean>{
        const secretKey = "6Ld5sYwkAAAAAMGvakjbE6DE7CEpBFt_5O9ux7Lk";
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        const response = await this.httpService.post(url).toPromise();
        return response.data.success;
    }
}
